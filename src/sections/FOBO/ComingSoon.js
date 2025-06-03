import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const mockResumes = [
  {
    id: 1,
    name: 'Atharva Nikam',
    company: '',
    email: '',
    phone: '+919850012997',
    value: '',
    tags: '',
    assigned: '',
    status: 'New',
    source: 'Facebook',
  },
  {
    id: 2,
    name: 'Utkarsh Sharma',
    company: 'Combat Solutions',
    email: '',
    phone: '+918329149230',
    value: '',
    tags: '',
    assigned: '',
    status: 'Customer',
    source: 'Facebook',
  },
  {
    id: 3,
    name: 'Gopinath N',
    company: '',
    email: '',
    phone: '+919886305397',
    value: '',
    tags: '',
    assigned: '',
    status: 'New',
    source: 'Facebook',
  },
];

// Status color mapping
const statusColorMap = {
  New: 'success',
  Customer: 'warning',
};

export default function ResumeTable() {
  const inputRef = useRef(null);
  const [resumes, setResumes] = useState(mockResumes);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploaded: ${file.name}`);
      // Handle file upload logic here
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0f172a', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
            Resume
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
              borderRadius: '20px',
              px: 4,
              py: 1,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            onClick={() => inputRef.current?.click()}
            startIcon={<CloudUploadIcon />}
          >
            Add
          </Button>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            ref={inputRef}
            onChange={handleUpload}
          />
        </Box>

        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Assigned</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Source</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resumes.map((resume, index) => {
                  const chipColor = statusColorMap[resume.status] || 'default';
                  return (
                    <TableRow key={resume.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{resume.name}</TableCell>
                      <TableCell>{resume.company}</TableCell>
                      <TableCell>{resume.email}</TableCell>
                      <TableCell>{resume.phone}</TableCell>
                      <TableCell>{resume.value}</TableCell>
                      <TableCell>{resume.tags}</TableCell>
                      <TableCell>{resume.assigned}</TableCell>
                      <TableCell>
                        <Chip
                          label={resume.status}
                          color={chipColor}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{resume.source}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}
