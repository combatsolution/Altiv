import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function PostSort({ sort, sortOptions, onSort }) {
  const popover = usePopover();

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        }
        sx={{
          textTransform: "none",
          fontSize: { xs: "0.9rem", sm: "1rem" },
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 0.8,                // 🔥 spacing between text & value

          whiteSpace: "nowrap",   // 🔥 prevents line break
          px: 1.5,
          py: 0.8,
        }}
      >
        <Box component="span" sx={{ opacity: 0.8 }}>
          Sort By:
        </Box>

        <Box component="span" sx={{ fontWeight: 700 }}>
          {sort}
        </Box>
      </Button>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sort === option.value}
            onClick={() => {
              popover.onClose();
              onSort(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

PostSort.propTypes = {
  onSort: PropTypes.func,
  sort: PropTypes.string,
  sortOptions: PropTypes.array,
};
