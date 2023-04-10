export default function Button({ label }: { label: string }) {
    return (
        <button className="text-center px-4 py-3 bg-primary rounded-lg text-white text-sm font-bold tracking-wider bg-gradient-to-r from-secondary to-primary">
            {label}
        </button>
    )
}
