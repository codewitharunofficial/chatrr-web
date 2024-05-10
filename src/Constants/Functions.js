import axios from "axios";

export const getChats = async (id) => {
    try {
      const { data } = await axios.get(
        `https://android-chattr-app.onrender.com/api/v1/messages/chats/${id}`
      );
      if(data?.chats){
        // console.log(data);
        return data?.chats
      }
    } catch (error) {
      console.log(error);
    }
  };