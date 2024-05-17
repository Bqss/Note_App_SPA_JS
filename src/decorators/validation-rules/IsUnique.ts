import sequelize from "@base/utils/database";
import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { QueryTypes } from "sequelize";

/**
 * Decorator to check if a value is unique in a table
 * @param {string} table
 * the table to check
 * @param {string} column
 * the column to check
 * @param {string} [except]
 * the value to exclude from the check
 * @param {ValidationOptions} [validationOptions]
 * the validation options
 */
export function isUnique(table: string, column: string, except?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string, ) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, column, except],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const count  = await sequelize.query(`SELECT COUNT(${column}) as count FROM ${table} WHERE ${column} = '${value}'`,{
            type: QueryTypes.SELECT
          }) as any;
          return count[0].count == 0;
        },

        defaultMessage(args: ValidationArguments) {
          return `This ${args.constraints[1]} is already used. Please use another one.`;
        }
      },
    });
  };

}