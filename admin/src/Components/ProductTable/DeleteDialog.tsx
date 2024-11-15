import { Dialog, Button, Box } from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  itemCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  itemCount,
  onConfirm,
  onCancel,
}) => (
  <Dialog open={open} onClose={onCancel}>
    <Box p={3}>
      <h2>Підтвердження видалення</h2>
      <p>
        {itemCount > 1
          ? `Ви дійсно хочете видалити ${itemCount} вибраних товарів?`
          : "Ви дійсно хочете видалити цей товар?"}
      </p>
      <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
        <Button onClick={onCancel}>Скасувати</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Видалити
        </Button>
      </Box>
    </Box>
  </Dialog>
);
