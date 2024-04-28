const data = localStorage.getItem("user");
const user = JSON.parse(data);

export const userFields = [
    {
        _id: 1,
        name: "Name",
        info: user?.name
    },
    {
        _id: 2,
        name: "Phone",
        info: user?.phone
    },
    {
        _id: 3,
        name: "Email",
        info: user?.email
    },
    {
        _id: 4,
        name: "Bio",
        info: user?.bio ? user?.bio : "Hey! I'm A Chatrr"
    },
] 