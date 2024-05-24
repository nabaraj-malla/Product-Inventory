function deleteProduct(id) {
  const result = confirm("Are you sure to delete");
  // if (result) {
  //   fetch("/delete-product/" + id, {
  //     method: "POST",
  //   }).then((res) => {
  //     if (res.ok) {
  //       // location.reload();
  //       window.location.href = "/";
  //     }
  //   });
  // }
  if (result) {
    const promiseResult = fetch(`/delete-product/${id}`, {
      method: "post",
    });
    promiseResult.then((res) => {
      if (res.ok) {
        window.location.href = "/";
      }
    });
    promiseResult.catch((err) => {
      console.log(err);
    });
  }
}
