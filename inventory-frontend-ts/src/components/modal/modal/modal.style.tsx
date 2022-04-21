import styled from 'styled-components';

export const Wrapper = styled.div`
	position: fixed;
	min-width: 550px;
	top: 4.5em;
	left: 50%;
	transform: translate(-50%);
	z-index: 700;
	width: inherit;
	outline: 0;

	@media screen and (orientation: portrait) {
		min-width: 60px;
		left: 0.5em;
		right: 0.5em;
		top: 3.5em;
		transform: translate(0%);
	}
`;

export const Backdrop = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 500;
`;

export const StyledModal = styled.div`
	z-index: 100;
	background: white;
	position: relative;
	margin: auto;
	border-radius: 8px;
`;

export const Header = styled.div`
	border-radius: 8px 8px 0 0;
	display: flex;
	justify-content: space-between;
	padding: 0.3rem;
`;

export const HeaderText = styled.div`
	color: #fff;
	align-self: center;
	color: lightgray;
`;

export const CloseButton = styled.button`
	font-size: 0.8rem;
	border: none;
	border-radius: 3px;
	margin-left: 0.5rem;
	background: none;
	:hover {
		cursor: pointer;
	}
`;

export const Content = styled.div`
	padding: 10px;
	max-height: 30rem;
	overflow-x: hidden;
	overflow-y: auto;
`;