import { useState } from 'react';

export const useModal = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onClickToggle = () => setIsOpen(!isOpen);
	return {
		isOpen: isOpen,
		onClickToggle: onClickToggle,
	};
};