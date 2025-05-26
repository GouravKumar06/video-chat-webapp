import { MessageSeenSvg } from "@/lib/svgs";
import { IMessage, useConversationStore } from "@/store/chat-store";
import ChatBubbleAvatar from "./chat-bubble-avatar";
import DateIndicator from "./date-indicator";

// import { useState } from "react";


type ChatBubbleProps = {
	me: any;
	message: IMessage;
	previousMessage: IMessage;
};

const ChatBubble = ({ me, message, previousMessage } : ChatBubbleProps) => {

	const date = new Date(message._creationTime);
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const time = `${hour}:${minute}`;

	const { selectedConversation } = useConversationStore();

	const isMember = selectedConversation?.participants.includes(message.sender?._id) || false;
	const isGroup = selectedConversation?.isGroup;
	const fromMe = message.sender?._id === me._id;
	// const fromAI = message.sender?.name === "ChatGPT";
	// const bgClass = fromMe ? "bg-green-chat" : !fromAI ? "bg-white dark:bg-gray-primary" : "bg-blue-500 text-white";
	const bgClass = fromMe ? "bg-green-chat" : "bg-white dark:bg-gray-primary";


	console.log(message.sender);
	// const [open, setOpen] = useState(false);

    if (!fromMe) {
		return (
			<>
				<DateIndicator message={message} previousMessage={previousMessage} />
				<div className='flex gap-1 w-2/3'>
					<ChatBubbleAvatar isGroup={isGroup} isMember={isMember} message={message}/>
					<div className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
						{/* {!fromAI && <OtherMessageIndicator />} */}
						{/* {fromAI && <Bot size={16} className='absolute bottom-[2px] left-2' />} */}
						{/* {<ChatAvatarActions message={message} me={me} />} */}
						{/* {renderMessageContent()} */}
						{/* {open && <ImageDialog src={message.content} open={open} onClose={() => setOpen(false)} />} */}
						<OtherMessageIndicator />
						<TextMessage message={message} />
						<MessageTime time={time} fromMe={fromMe} />
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<DateIndicator message={message} previousMessage={previousMessage} />

			<div className='flex gap-1 w-2/3 ml-auto'>
				<div className={`flex  z-20 max-w-fit px-2 pt-1 rounded-md shadow-md ml-auto relative ${bgClass}`}>
					<SelfMessageIndicator />
					{/* {renderMessageContent()} */}
					{/* {open && <ImageDialog src={message.content} open={open} onClose={() => setOpen(false)} />} */}
					<TextMessage message={message} />
					<MessageTime time={time} fromMe={fromMe} />
				</div>
			</div>
		</>
	);
};
export default ChatBubble;



const MessageTime = ({ time, fromMe }: { time: string; fromMe: boolean }) => {
	return (
		<p className='text-[10px] mt-2 self-end flex gap-1 items-center'>
			{time} {fromMe && <MessageSeenSvg />}
		</p>
	);
};


const OtherMessageIndicator = () => (
	<div className='absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full' />
);

const SelfMessageIndicator = () => (
	<div className='absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden' />
);

const TextMessage = ({ message }: { message: IMessage }) => {
	const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content); // Check if the content is a URL

	return (
		<div>
			{isLink ? (
				<a
					href={message.content}
					target='_blank'
					rel='noopener noreferrer'
					className={`mr-2 text-sm font-light text-blue-400 underline`}
				>
					{message.content}
				</a>
			) : (
				<p className={`mr-2 text-sm font-light`}>{message.content}</p>
			)}
		</div>
	);
};