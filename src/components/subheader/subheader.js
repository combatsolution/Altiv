/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */ 
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { paths } from 'src/routes/paths'; // ✅ Make sure this path is correct

export default function SubHeader({ subtitle }) {
    const navigate = useNavigate();
    
    return ( 
        <Box sx={{ backgroundColor: '#E9F4FF', py: 1.5, width: "100%", zIndex: -10, position: 'relative' }}>
            <Container sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <img 
                    src="/assets/home.svg" 
                    style={{ width: "25px", cursor: 'pointer' }} 
                    alt="homesvg" 
                    onClick={() => navigate(paths.fobo)} // ✅ Updated path
                />
                <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: '12px' }} />
                <Typography variant="body2">{subtitle}</Typography> 
            </Container>
        </Box>
    ); 
}

SubHeader.propTypes = {
  subtitle: PropTypes.string
};
