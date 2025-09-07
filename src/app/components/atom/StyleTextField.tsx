export const StyleTextField = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    backgroundColor: '#fafafa',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      borderWidth: 1,
    },
  },
}