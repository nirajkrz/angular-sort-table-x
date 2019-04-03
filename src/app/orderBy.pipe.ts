/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : order: reverse'" OR  orderBy: "{{ order }}":{{ reverse}}
 *		Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy', pure: false })
export class OrderBy implements PipeTransform {

    transform(value: any | any[], expression?: any, reverse?: boolean): any {
    if (!value) {
      return value;
    }

    const isArray = value instanceof Array;

    if (isArray) {
      return this.sortArray(value, expression, reverse);
    }

    if (typeof value === 'object') {
      return this.transformObject(value, expression, reverse);
    }

    return value;
  }

  /**
   * Sort array
   *
   * @param value
   * @param expression
   * @param reverse
   * @returns {any[]}
   */
  private sortArray(value: any[], expression?: any, reverse?: boolean): any[] {
    const isDeepLink = expression && expression.indexOf('.') !== -1;

    if (isDeepLink) {
      expression = OrderByPipe.parseExpression(expression);
    }

    const array: any[] = value.sort((a: any, b: any): number => {
      if (!expression) {
        return a > b ? 1 : -1;
      }

      if (!isDeepLink) {
        return a[expression] > b[expression] ? 1 : -1;
      }

      return OrderByPipe.getValue(a, expression) > OrderByPipe.getValue(b, expression) ? 1 : -1;
    });

    if (reverse) {
      return array.reverse();
    }

    return array;
  }


  /**
   * Transform Object
   *
   * @param value
   * @param expression
   * @param reverse
   * @returns {any[]}
   */
  private transformObject(value: any | any[], expression?: any, reverse?: boolean): any {
    const parsedExpression = OrderByPipe.parseExpression(expression);
    let lastPredicate = parsedExpression.pop();
    let oldValue = OrderByPipe.getValue(value, parsedExpression);

    if (!(oldValue instanceof Array)) {
      parsedExpression.push(lastPredicate);
      lastPredicate = null;
      oldValue = OrderByPipe.getValue(value, parsedExpression);
    }

    if (!oldValue) {
      return value;
    }

    const newValue = this.transform(oldValue, lastPredicate, reverse);
    OrderByPipe.setValue(value, newValue, parsedExpression);
    return value;
  }

  /**
   * Parse expression, split into items
   * @param expression
   * @returns {string[]}
   */
  private static parseExpression(expression: string): string[] {
    expression = expression.replace(/\[(\w+)\]/g, '.$1');
    expression = expression.replace(/^\./, '');
    return expression.split('.');
  }

  /**
   * Get value by expression
   *
   * @param object
   * @param expression
   * @returns {any}
   */
  private static getValue(object: any, expression: string[]) {
    for (let i = 0, n = expression.length; i < n; ++i) {
      const k = expression[i];
      if (!(k in object)) {
        return;
      }
      object = object[k];
    }

    return object;
  }

  /**
   * Set value by expression
   *
   * @param object
   * @param value
   * @param expression
   */
  private static setValue(object: any, value: any, expression: string[]) {
    let i;
    for (i = 0; i < expression.length - 1; i++) {
      object = object[expression[i]];
    }

    object[expression[i]] = value;
  }
}
