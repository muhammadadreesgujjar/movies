const permisionService = (users, email, permisionType) => {
  const updatedUsers = users.map((item) => {
    if (item.email == email) {
      let obj = {
        ...item.permisions,
        [permisionType]: !item.permisions[permisionType],
      };
      return { ...item, permisions: { ...obj } };
    } else {
      return item;
    }
  });
  return updatedUsers;
};

export default permisionService;
