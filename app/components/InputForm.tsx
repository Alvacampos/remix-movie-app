type ActionDataProps = {
  data: {
    errors:
      | {
          name: string;
          message: string;
        }
      | any;
  };
  msg: string;
};

export default function InputForm({ data, msg }: ActionDataProps) {
  const inputStyle = (fieldName: any) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      data?.errors[fieldName] ? 'border-red-500' : ''
    }`;

  return (
    <div>
      <label className="inline-block my-2">
        {msg === 'Name:' ? 'Name:' : 'Message:'}{' '}
      </label>
      <input name="name" type="text" className={inputStyle('name')} />
      {msg === 'Name:'
        ? data?.errors.name && (
            <p className="text-red-500">{data?.errors.name}</p>
          )
        : data?.errors.message && (
            <p className="text-red-500">{data?.errors.message}</p>
          )}
    </div>
  );
}
