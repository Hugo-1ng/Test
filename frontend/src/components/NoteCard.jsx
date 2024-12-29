import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton, 
  Chip, 
  Stack,
  Tooltip,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Collapse,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const NoteCard = ({ note, onEdit, onDelete, onArchive, viewMode = 'grid' }) => {
  const [expanded, setExpanded] = React.useState(false);

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
    <Card sx={{ 
      minWidth: 275, 
      mb: 2,
      backgroundColor: note.archived ? 'rgba(0, 0, 0, 0.02)' : 'white',
      transition: 'background-color 0.3s ease'
    }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {note.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {actionButtons}
      </CardActions>
    </Card>
  );
};

export default NoteCard;
