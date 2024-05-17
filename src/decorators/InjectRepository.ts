import 'reflect-metadata';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import Container from 'typedi';


export function InjectRepository(target: Object, propertyName: string | symbol, index: number) {
  // Get the types of the parameters
  const parameterTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);

  // Check if the parameter type is a subclass of Model
  if (parameterTypes && parameterTypes[index] && parameterTypes[index].prototype instanceof RepositoryBase) {
    const repository = Container.get(parameterTypes[index]);
    Object.defineProperty(target, propertyName, {
      value: repository,
      writable: false,
      enumerable: true,
      configurable: true
    });
  } else {
    throw new Error('InjectRepository decorator can only be applied to parameters of type RepositoryBase');
  }
}