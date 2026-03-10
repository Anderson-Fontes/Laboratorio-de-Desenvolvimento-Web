// src/components/HabitForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../store/habitSlice';
import { v4 as uuidv4 } from 'uuid';
import { Box, TextField, Button, Paper } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

export const HabitForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return; 

    dispatch(addHabit({
      id: uuidv4(),
      name: name.trim(),
      category: category.trim() || 'Geral', 
      completed: false,
    }));
    
    setName('');
    setCategory('');
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit} 
      elevation={2}
      sx={{ 
        display: 'flex', 
        gap: 2, 
        p: { xs: 2, md: 3 }, 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        alignItems: 'center'
      }}
    >
      <TextField 
        label="Qual seu novo hábito? *" 
        variant="outlined"
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        sx={{ flexGrow: 1 }}
        size="medium"
        placeholder="Ex: Ler 10 páginas, Beber água..."
      />
      <TextField 
        label="Categoria (Opcional)" 
        variant="outlined"
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        sx={{ width: { xs: '100%', sm: '220px' } }}
        size="medium"
        placeholder="Ex: Saúde, Estudo"
      />
      <Button 
        type="submit" 
        variant="contained" 
        startIcon={<AddTaskIcon />}
        sx={{ 
          px: 4, 
          py: 1.8, 
          width: { xs: '100%', sm: 'auto' },
          background: 'linear-gradient(45deg, #8b5cf6, #6366f1)', // Botão em gradiente
          boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)',
          '&:hover': {
            background: 'linear-gradient(45deg, #7c3aed, #4f46e5)',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.23)',
          }
        }}
      >
        Adicionar
      </Button>
    </Paper>
  );
};