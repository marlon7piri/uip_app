export const uploadFile = async (image:any) => {

    const formData = new FormData()

    formData.append('image', image)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload`, {
        method: 'POST',

        body: formData
      })

      const data = await res.json()
     return data.url

    } catch (error) {
      console.log(error)
    }

  }