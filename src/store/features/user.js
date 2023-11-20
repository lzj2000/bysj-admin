import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userinfo: null
};

// 创建一个 Slice 
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    getUserInfo: (state,{payload}) => {
      state.userinfo = payload.value;
    },
    removeUserInfo:(state) => {
        state.userinfo = null
    }
  },
});
// 导出加减的方法
export const { getUserInfo, removeUserInfo } = userSlice.actions;

// 默认导出
export default userSlice.reducer;

