export default function Input({
    label,
    type,
    name
}: {
    label: string
    type: string
    name: string
}) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                className="border rounded-lg leading-10 px-4 focus:border-primary focus:outline-none text-sm text-gray-700"
            />
        </div>
    )
}
