import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Box,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  Stack,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const NoteCard = ({ note, onEdit, onDelete, onArchive, viewMode = 'grid' }) => {
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const actionButtons = (
    <>
      {onEdit && (
        <Tooltip title="Edit note">
          <IconButton 
            size="small" 
            onClick={() => onEdit(note)}
            sx={{ ml: 1 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="View note">
        <IconButton 
          size="small" 
          onClick={handleOpenDialog}
          sx={{ ml: 1 }}
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      {onArchive && (
        <Tooltip title={note.archived ? 'Unarchive note' : 'Archive note'}>
          <IconButton 
            size="small" 
            color="secondary" 
            onClick={() => onArchive(note)}
            sx={{ ml: 1 }}
          >
            {note.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title="Delete note">
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => onDelete(note.id)}
            sx={{ ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );

  const noteContent = (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div">
            {note.title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
            {note.categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                size="small"
                color={category.is_default ? "default" : "primary"}
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
            <Typography variant="caption" color="text.secondary">
              Created: {formatDate(note.created_at)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {note.content}
        </Typography>
      </Box>
    </>
  );

  if (viewMode === 'list') {
    return (
      <ListItem 
        sx={{ 
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: note.archived ? 'rgba(0, 0, 0, 0.02)' : 'white',
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" component="div">
                {note.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Created: {formatDate(note.created_at)}
              </Typography>
              <IconButton 
                size="small" 
                onClick={() => setExpanded(!expanded)}
                sx={{ ml: 1 }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          }
          secondary={
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {note.content}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {note.categories.map((category) => (
                    <Chip 
                      key={category.id} 
                      label={category.name} 
                      size="small"
                      sx={{ opacity: note.archived ? 0.7 : 1 }}
                    />
                  ))}
                </Stack>
              </Box>
            </Collapse>
          }
        />
        <ListItemSecondaryAction>
          {actionButtons}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  return (
    <>
      <Card 
        sx={{ 
          mb: 2,
          height: viewMode === 'grid' ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: note.archived ? 'rgba(0, 0, 0, 0.02)' : 'white',
          transition: 'background-color 0.3s ease'
        }}
      >
        <CardContent>
          {noteContent}
        </CardContent>
        <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
          {actionButtons}
        </CardActions>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {note.title}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {note.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  color={category.is_default ? "default" : "primary"}
                />
              ))}
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            {note.content}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Created: {formatDate(note.created_at)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {actionButtons}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteCard;
