/**
 * This file is based on the lectures/tutorials by Le Kang.
 */

import style from './Message.module.css'

/**
 * Represents a message component that displays different types of messages with specific styles.
 */
type MessageProps = {
    variant: string
    message: string
}

/**
 * Renders a message component with the specified variant and message content.
 * @param {MessageProps} props The props for the Message component.
 * @returns The rendered message component with the appropriate style and content.
 */
export default function Message({ variant, message }: MessageProps) {
    return (
        <div className={ `${style.message} ${style[variant]}` }>
            { message }
        </div>
    );
}
