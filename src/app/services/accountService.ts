import { UpdateMeBodyType } from "@/app/common/validation/account.schema";

export const updateAccount = async (accountData: UpdateMeBodyType) => {
  try {
    // Chuẩn bị data để gửi lên server
    const payload = {
      name: accountData.name,
      username: accountData.username,
      phone: accountData.phone,
      gender: accountData.gender,
      dob: accountData.dob // Có thể là string hoặc null
    };

    // Loại bỏ các trường undefined hoặc null nếu server không chấp nhận
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
    );

    // const response = await apiClient.put('/account', cleanPayload);
    // return response.data;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};