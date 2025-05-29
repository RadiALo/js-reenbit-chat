import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChatDto } from "../types/ChatDto";

type FormData = {
  prefferedName: string;
};

type EditChatFormProps = {
  chat: ChatDto;
  onUpdateSuccess?: (chat: ChatDto) => void;
  onUpdateError?: (error: string) => void;
  onClose?: () => void;
};

const EditChatForm: React.FC<EditChatFormProps> = ({
  chat,
  onUpdateSuccess,
  onUpdateError,
  onClose,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/chats/preffered`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, chatId: chat._id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Update chat failedL ${errorData.message}`);
      onUpdateError?.(errorData.message);
      return;
    }

    const newChat: ChatDto = await response.json();
    onUpdateSuccess?.({...chat, prefferedName: newChat.prefferedName});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Chat:</label>
        <input type="text" disabled value={chat.responder.name} />
      </div>

      <div>
        <label>Preffered Name:</label>
        <input
          type="text"
          {...register("prefferedName", { value: chat.prefferedName })}
        />
      </div>

      <div>
        <button className="button" type="submit">
          Save
        </button>

        <button className="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditChatForm;
