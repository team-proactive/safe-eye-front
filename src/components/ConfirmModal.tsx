import { ReactNode } from "react";
import tw, { styled } from "twin.macro";

const Modal = styled.dialog`
  ${tw`modal`}
  &::backdrop {
    ${tw`bg-black opacity-50`}
  }
`;
const ModalBox = tw.div`modal-box`;
const ModalTitle = tw.h3`font-bold text-lg`;
const ModalContent = tw.p`py-4`;
const ModalActions = tw.div`modal-action`;
const ConfirmButton = styled.button`
  ${tw`btn`}
  ${({ color }) =>
    color
      ? `background-color text-center: ${color};`
      : tw`bg-red-400 text-center`}
`;
const CancelButton = styled.button`
  ${tw`btn`}
  ${({ color }) => (color ? `background-color: ${color};` : tw`bg-neutral-700`)}
`;

interface CustomConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  content?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "확인해주세요.",
  content = "정말 진행하시겠습니까?",
  confirmText = "확인",
  cancelText = "취소",
  confirmColor,
  cancelColor,
}: CustomConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalBox>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalActions>
          <CancelButton color={cancelColor} onClick={onClose}>
            {cancelText}
          </CancelButton>
          <ConfirmButton color={confirmColor} onClick={handleConfirm}>
            {confirmText}
          </ConfirmButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
}
