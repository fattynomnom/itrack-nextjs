import {
    ExclamationCircleIcon,
    InformationCircleIcon
} from '@heroicons/react/24/solid'

import { ChangeEvent } from 'react'

export default function Input({
    label,
    type,
    name,
    hintMessage,
    errorMessage,
    dataTestId = '',
    onChange
}: {
    label: string
    type: string
    name: string
    hintMessage?: string
    errorMessage?: string
    dataTestId?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                className={`border rounded-lg leading-10 px-4 focus:border-primary focus:outline-none text-sm text-gray-700 ${
                    errorMessage && 'border-danger'
                }`}
                onChange={onChange}
                data-testid={dataTestId}
            />
            {hintMessage && (
                <div className="text-gray-500 flex items-center space-x-1">
                    <InformationCircleIcon className="w-5 h-5" />
                    <span className="text-xs">{hintMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div className="text-danger flex items-center space-x-1">
                    <ExclamationCircleIcon className="w-5 h-5" />
                    <span
                        className="text-xs"
                        data-testid={`${dataTestId}-error-message`}
                    >
                        {errorMessage}
                    </span>
                </div>
            )}
        </div>
    )
}
