import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChatDto } from "../types/ChatDto";

type FormData = {
  prefferedName: string;
  responderId: string;
};

type CreateChatProps = {
  userId: string;
  onCreateSuccess?: (chat: ChatDto) => void;
  onCreateError?: (error: string) => void;
}

const CreateChatForm: React.FC<CreateChatProps> = ({ userId, onCreateSuccess, onCreateError }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ responders, setResponders ] = useState<{name: string, _id: string}[]>([]);
  useEffect(() => {
    const fetchResponders = async () => {
      const response = await fetch(`${apiUrl}/responders`);

      if (!response.ok) {
        return;
      }

      const respondersJson = await response.json();
      setResponders(respondersJson);
    }

    fetchResponders();
  })

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, ownerId: userId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Create chat failed: ${errorData.message}`);
      onCreateError?.(errorData.message);
      return;
    }

    const newChat: ChatDto = await response.json();
    onCreateSuccess?.(newChat);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Select Responder:</label>

        <select {...register("responderId", { required: true })}>
          <option value="">-- Select a responder --</option>
          {responders.map((responder) => (
            <option key={responder._id} value={responder._id}>
              {responder.name}
            </option>
          ))}
        </select>

        {errors.responderId && <p>This field is required</p>}
      </div>

      <div>
        <label>Preferred Name:</label>
        <input
          {...register("prefferedName")}
          type="text"
        />
      </div>

      <button className="button" type="submit">Create</button>
    </form>
  )
}

export default CreateChatForm;