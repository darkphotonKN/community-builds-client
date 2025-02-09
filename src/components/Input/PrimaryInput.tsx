type PrimaryInputProps = {
  value: string;
  handleChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  validation?: InputValidation;
};

type InputValidation = {
  text?: string;
  length?: number;
};

function PrimaryInput({
  value,
  handleChangeFn,
  placeHolder,
  validation,
}: PrimaryInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        className="w-[280px] bg-transparent text-center text-customHeaderTwo text-2xl border-b border-customSecondary pb-1 outline-none focus:outline-none"
        placeholder={placeHolder ?? "Please Enter"}
        onChange={handleChangeFn}
        value={value}
      />

      {validation &&
        validation.length &&
        value.length > 0 &&
        value.length < validation.length && (
          <span className="text-customSecondary">
            {validation.text
              ? validation.text
              : `Needs to be at least ${validation.length} characters long.`}
          </span>
        )}
    </div>
  );
}

export default PrimaryInput;
