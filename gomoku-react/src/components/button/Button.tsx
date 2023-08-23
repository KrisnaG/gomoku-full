/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import style from './Button.module.css'

type ButtonProp = {
    text: string,
    buttonStyle: string
    additionalClassName?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ text, buttonStyle, additionalClassName, ...props } : ButtonProp) {
    return (
        <button 
            className={ `${style[buttonStyle]} ${additionalClassName ?? ''}` } 
            { ...props }
        >
            { text }
        </button>
    );
}