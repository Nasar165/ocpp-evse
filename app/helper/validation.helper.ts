import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

type ValidationResult<T> = [T, Array<ValidationError>];

const defaultValue = {
  enableDebugMessages: false,
  validationError: { target: false },
};

export default function Validate<T>(c: any, obj: unknown): ValidationResult<T> {
  const result: object = plainToClass(c, obj);
  const validation = validateSync(result, defaultValue);
  return [result as T, validation];
}
