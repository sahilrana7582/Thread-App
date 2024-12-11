const baseUrl = import.meta.env.VITE_API_URL;
export const usePost = async (formData) => {
  try {
    const res = await fetch(`${baseUrl}/user/newpost`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: Status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error('Something Wrong While Posting ' + e);
  }
};

export const getPost = async () => {
  try {
    const res = await fetch(`${baseUrl}/user/allPost`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Error In Response Get Posts');
    }

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error('Something Went Wrong While Getting All Posts ' + e);
  }
};
