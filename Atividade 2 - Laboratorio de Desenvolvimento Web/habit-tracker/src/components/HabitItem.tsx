// src/components/HabitItem.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleHabitComplete, deleteHabit, editHabit } from '../store/habitSlice';
import { Habit } from '../types';
import { Checkbox, IconButton, TextField, Box, Paper, Typography, Chip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  habit: Habit;
}

export const HabitItem: React.FC<Props> = ({ habit }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const [editCategory, setEditCategory] = useState(habit.category);

  const handleSave = () => {
    if (editName.trim()) {
      dispatch(editHabit({ id: habit.id, name: editName, category: editCategory || 'Geral' }));
      setIsEditing(false);
    }
  };

  return (
    <Paper
      elevation={habit.completed ? 0 : 2}
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        p: 2.5,
        bgcolor: habit.completed ? 'rgba(30, 41, 59, 0.5)' : 'background.paper', 
        borderLeft: '4px solid',
        borderColor: habit.completed ? 'secondary.main' : 'primary.main',
        borderRadius: 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: habit.completed ? 0.6 : 1,
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: habit.completed ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          opacity: 1, // Restaura opacidade no hover mesmo se concluído
        }
      }}
    >
      <Checkbox
        checked={habit.completed}
        onChange={() => dispatch(toggleHabitComplete(habit.id))}
        icon={<RadioButtonUncheckedIcon sx={{ fontSize: 28 }} />}
        checkedIcon={<CheckCircleIcon color="secondary" sx={{ fontSize: 28 }} />}
        sx={{ mr: 2 }}
      />
      
      {isEditing ? (
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, mr: 2, alignItems: 'center' }}>
          <TextField 
            fullWidth 
            size="small" 
            label="Nome do Hábito"
            value={editName} 
            onChange={(e) => setEditName(e.target.value)} 
            autoFocus
          />
          <TextField 
            sx={{ width: '220px' }} 
            size="small" 
            label="Categoria"
            value={editCategory} 
            onChange={(e) => setEditCategory(e.target.value)} 
          />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="span"
            sx={{ 
              textDecoration: habit.completed ? 'line-through' : 'none',
              color: habit.completed ? 'text.secondary' : 'text.primary',
              fontWeight: habit.completed ? 400 : 600,
              transition: 'all 0.2s',
            }}
          >
            {habit.name}
          </Typography>
          <Box mt={0.8}>
            <Chip 
              label={habit.category} 
              size="small" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '0.75rem',
                bgcolor: habit.completed ? 'rgba(255,255,255,0.05)' : 'rgba(139, 92, 246, 0.15)',
                color: habit.completed ? 'text.secondary' : 'primary.light',
                border: '1px solid',
                borderColor: habit.completed ? 'transparent' : 'rgba(139, 92, 246, 0.3)'
              }}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
        <IconButton 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          color={isEditing ? "primary" : "default"}
          sx={{ bgcolor: isEditing ? 'rgba(139, 92, 246, 0.1)' : 'transparent' }}
        >
          {isEditing ? <SaveIcon /> : <EditOutlinedIcon />}
        </IconButton>
        <IconButton 
          onClick={() => dispatch(deleteHabit(habit.id))} 
          sx={{ 
            color: 'error.main',
            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};