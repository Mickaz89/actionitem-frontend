import {
  deleteUser,
  isSaved,
  onCloseDialog,
  updateUser,
  upsertUser,
} from "@/redux/user";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UserDialog = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.user.dialog);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedUser && selectedUser.name) {
      setName(
        `${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`
      );
    }
  }, [selectedUser]);

  return (
    <Dialog open={open} onClose={() => dispatch(onCloseDialog())} fullWidth>
      {selectedUser && (
        <Box>
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <Box
              mt={5}
              component="img"
              sx={{
                height: 180,
                width: 180,
              }}
              alt="The house from the offer."
              src={selectedUser.picture.large}
            />
          </Box>
          <Box
            p={5}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box id={"left"}>
              <Box>
                <Typography>Name:</Typography>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="standard"
                  size="small"
                  inputProps={{ style: { fontSize: 12 } }}
                />
              </Box>
              <Box>
                <Typography>Address:</Typography>
                <Typography variant="subtitle2">
                  {` ${selectedUser.location.street.number} ${selectedUser.location.street.name}`}
                </Typography>
                <Typography variant="subtitle2">
                  {` ${selectedUser.location.city}, ${selectedUser.location.state}`}
                </Typography>
              </Box>
            </Box>
            <Box id={"right"}>
              <Box>
                <Typography>Gender:</Typography>
                <Typography variant="subtitle2">
                  {selectedUser.gender}
                </Typography>
              </Box>
              <Box>
                <Typography>Contact:</Typography>
                <Typography variant="subtitle2">
                  {selectedUser.email}
                </Typography>
                <Typography variant="subtitle2">
                  {selectedUser.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            p={3}
          >
            <Button
              disabled={dispatch(isSaved())}
              variant="outlined"
              onClick={() => dispatch(upsertUser(selectedUser))}
            >
              Save
            </Button>
            <Button
              disabled={!dispatch(isSaved())}
              variant="outlined"
              onClick={() => dispatch(deleteUser(selectedUser._id))}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(updateUser(name))}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(onCloseDialog())}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};
