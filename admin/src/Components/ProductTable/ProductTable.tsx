import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  TablePagination,
  styled,
  Button,
  Box,
  InputBase,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { fetchAllData } from "../../api/fetchAllData";
import { deleteItem } from "../../api/deleteItem";
import { DeleteDialog } from "./DeleteDialog";
import { Search as SearchIcon } from "@mui/icons-material";


// Типы данных
interface SizeItem {
  size: string;
  is_available: boolean;
}

interface DataItem {
  _id: string;
  name: string;
  images_urls: string[];
  vendor_code: number;
  type: string;
  style: string[];
  size: SizeItem[];
  price: number;
  price2?: number;
  discountPercentage?: number;
}

// Стилизованные компоненты
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 12px",
  fontSize: 14,
  borderRight: "1px solid #d0d0d0",
  "&:last-child": { borderRight: "none" },
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
    borderBottom: "2px solid #d0d0d0",
    whiteSpace: "nowrap",
  },
  "&.name-cell": {
    minWidth: "200px",
    maxWidth: "300px",
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  "&.photo-cell": {
    width: "60px",
    padding: "4px",
  },
  "&.code-cell": {
    width: "100px",
    whiteSpace: "nowrap",
  },
  "&.category-cell, &.style-cell": {
    minWidth: "120px",
    whiteSpace: "normal",
  },
  "&.size-cell": {
    minWidth: "150px",
    whiteSpace: "normal",
  },
  "&.price-cell, &.discount-cell": {
    width: "80px",
    whiteSpace: "nowrap",
    textAlign: "right",
  },
  "&.final-price": {
    color: "green",
  },
  "&.actions-cell": {
    width: "100px",
    padding: "4px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "& td": {
    borderRight: "1px solid #d0d0d0",
    "&:last-child": { borderRight: "none" },
  },
}));

const ImageCell = styled("img")({
  width: "50px",
  height: "50px",
  objectFit: "contain",
  display: "block",
  margin: "0 auto",
});

interface TableHeader {
  id: string;
  label: string;
  className: string;
}

const TABLE_HEADERS: TableHeader[] = [
  { id: "name", label: "Назва", className: "name-cell" },
  { id: "photo", label: "Фото", className: "photo-cell" },
  { id: "vendor_code", label: "Артикул", className: "code-cell" },
  { id: "type", label: "Категорія", className: "category-cell" },
  { id: "style", label: "Стиль", className: "style-cell" },
  { id: "size", label: "Розмір", className: "size-cell" },
  { id: "price", label: "Ціна", className: "price-cell" },
  { id: "discount", label: "% знижки", className: "discount-cell" },
  { id: "special_price", label: "Спец. ціна", className: "final-price" },
  { id: "actions", label: "Дії", className: "actions-cell" },
];



// Основной компонент
const ProductTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selected, setSelected] = useState<number[]>([]);
  const [socksDb, setSocksDb] = useState<DataItem[]>([]);
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null as string | null,
  });
  const [searchInput, setSearchInput] = useState<string>('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchAllData();
      setSocksDb(result);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setSocks(() => {
      return socksDb.filter(sock => 
        sock.name.toLowerCase().includes(searchInput.toLowerCase()) || 
        sock.vendor_code.toString().includes(searchInput))
    });
  }, [searchInput]);

  const highlightText = (text: string) => {
    if (!searchInput) return text;
  
    const regex = new RegExp(`(${searchInput})`, "gi");
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      part.toLowerCase() === searchInput.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "orange", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(
      event.target.checked ? socks.map((sock) => sock.vendor_code) : []
    );
  };

  const handleSelectClick = (vendor_code: number) => {
    setSelected((prev) =>
      prev.includes(vendor_code)
        ? prev.filter((id) => id !== vendor_code)
        : [...prev, vendor_code]
    );
  };

  const handleDelete = async () => {
    try {
      if (deleteDialog.id) {
        await deleteItem(deleteDialog.id);
      } else if (selected.length) {
        const selectedItems = socks.filter((sock) =>
          selected.includes(sock.vendor_code)
        );
        await Promise.all(selectedItems.map((item) => deleteItem(item._id)));
      }
      await loadData();
      setSelected([]);
    } catch (error) {
      console.error("Failed to delete items:", error);
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  const renderTableCell = (sock: DataItem, field: string) => {
    switch (field) {
      case "name":
        return highlightText(sock.name);
      case "photo":
        return <ImageCell src={sock.images_urls[0]} alt={sock.name} />;
      case "vendor_code":
        return highlightText(sock.vendor_code.toString()); 
      case "type":
        return sock.type;
      case "style":
        return sock.style.join(", ");
      case "size":
        return sock.size
          .filter((s) => s.is_available)
          .map((s) => s.size)
          .join(", ");
      case "price":
        return (
          <span
            style={{
              textDecoration: sock.price2 ? "line-through" : "none",
              opacity: sock.price2 ? 0.5 : 1,
            }}
          >
            {sock.price}грн
          </span>
        );
      case "discount":
        return sock.discountPercentage ? `${sock.discountPercentage}%` : "";
      case "special_price":
        return sock.price2 ? (
          <span className="text-green-500">{sock.price2}грн</span>
        ) : (
          ""
        );
      case "actions":
        return (
          <Box display="flex" justifyContent="space-around">
            <Link to={`/edit/${sock.vendor_code}`}>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteDialog({ open: true, id: sock._id })}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      default:
        return sock[field as keyof DataItem] || "";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        Завантаження...
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px" }}>
      <Box display="flex" justifyContent="space-between" mt={3} mb={2}>
        <Button
          variant="contained"
          color="error"
          disabled={!selected.length}
          onClick={() => setDeleteDialog({ open: true, id: null })}
        >
          Видалити
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            padding: "4px 8px",
            width: "500px",
          }}
        >
          <SearchIcon sx={{ color: "grey", marginRight: 1 }} />
          <InputBase
            placeholder="Пошук за назвою або артикулом"
            sx={{ color: "grey", width: "100%" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Box>
        <Link to="/add">
          <Button variant="contained">Додати товар</Button>
        </Link>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{
            maxHeight: {
              xs: "400px",
              sm: "500px",
              md: "600px",
            },
            overflowX: "auto",
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  padding="checkbox"
                  sx={{
                    width: "48px",
                    position: "sticky",
                    left: 0,
                    zIndex: 3,
                    backgroundColor: "white",
                  }}
                >
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < socks.length
                    }
                    checked={
                      socks.length > 0 && selected.length === socks.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
                {TABLE_HEADERS.map((header) => (
                  <StyledTableCell
                    key={header.id}
                    className={header.className}
                    align={header.id === "name" ? "left" : "center"}
                  >
                    {header.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {socks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sock) => (
                  <StyledTableRow
                    key={sock.vendor_code}
                    selected={selected.includes(sock.vendor_code)}
                    hover
                  >
                    <StyledTableCell
                      padding="checkbox"
                      sx={{
                        position: "sticky",
                        left: 0,
                        backgroundColor: selected.includes(sock.vendor_code)
                          ? "action.selected"
                          : "inherit",
                      }}
                    >
                      <Checkbox
                        checked={selected.includes(sock.vendor_code)}
                        onChange={() => handleSelectClick(sock.vendor_code)}
                      />
                    </StyledTableCell>
                    {TABLE_HEADERS.map((header) => (
                      <StyledTableCell
                        key={`${sock.vendor_code}-${header.id}`}
                        className={header.className}
                      >
                        {renderTableCell(sock, header.id)}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={socks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "white",
          }}
        />
      </Paper>

      <DeleteDialog
        open={deleteDialog.open}
        itemCount={deleteDialog.id ? 1 : selected.length}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, id: null })}
      />
    </Box>
  );
};

export default ProductTable;
