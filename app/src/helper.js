
export const userStore = (data) => {
    localStorage.setItem("user", JSON.stringify({
        token: data.token,
    }))
    console.log(data)
};

export const userData = () => {
    const userStringfied = localStorage.getItem("user") || '""';
    return JSON.parse(userStringfied || {});
};