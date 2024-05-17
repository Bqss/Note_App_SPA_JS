import { isArray, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function isSame(anotherFIeld: string| Array<string>, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string, ) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [anotherFIeld],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const anotherFields = args.constraints[0];
          const repository = args.object as any; 
          if(isArray(anotherFields)){
            anotherFields.forEach(field => {
              if(value !== repository[field])  {
                return false;
              } 
            });
          }else{
            if(value !== repository[anotherFields])  {
              return false;
            }
          }
          return true;
        },

        defaultMessage(args: ValidationArguments) {
          if(isArray(args.constraints[0])){
            return `This ${args.constraints[0].join(', ')} must be the same.`;
          }else{
            return `This ${args.constraints[0]} must be the same.`;
          }
        }
      },
    });
  };

}