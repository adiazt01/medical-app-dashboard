import { FieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <small className="ml-2 mt-2 text-sm text-red-500 font-medium leading-none">{field.state.meta.errors.join(", ")}</small>
      ) : null}
    </>
  );
}
