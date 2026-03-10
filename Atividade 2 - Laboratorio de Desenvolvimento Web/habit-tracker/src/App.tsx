// src/App.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { clearCompletedHabits, setFilterCategory } from './store/habitSlice';
import { HabitForm } from './components/HabitForm';
import { HabitItem } from './components/HabitItem';
import { Container, Typography, Button, Select, MenuItem, Box, FormControl, InputLabel, Paper, LinearProgress } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function App() {
  const dispatch = useDispatch();
  const { habits, filterCategory } = useSelector((state: RootState) => state.habits);

  const categories = ['Todas', ...Array.from(new Set(habits.map(h => h.category)))];

  const filteredHabits = filterCategory === 'Todas' 
    ? habits 
    : habits.filter(h => h.category === filterCategory);

  // Fator "Uau": Cálculo dinâmico do progresso
  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completed).length;
  const progress = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 4, md: 8 }, pb: 8, px: 2 }}>
      <Container maxWidth="md">
        
        {/* Cabeçalho com Texto em Gradiente */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Dashboard de Hábitos
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Construa sua disciplina, um dia de cada vez.
          </Typography>
        </Box>

        {/* Card de Resumo e Progresso */}
        <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentTurnedInIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">Progresso de Hoje</Typography>
            </Box>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              {progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: 'background.default',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
              }
            }} 
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, textAlign: 'right' }}>
            {completedHabits} de {totalHabits} hábitos concluídos
          </Typography>
        </Paper>

        {/* Área de Formulário */}
        <HabitForm />

        {/* Filtros e Ações */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, mt: 5, alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>Filtrar por Categoria</InputLabel>
            <Select
              value={filterCategory}
              label="Filtrar por Categoria"
              onChange={(e) => dispatch(setFilterCategory(e.target.value))}
              sx={{ borderRadius: 2 }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteSweepIcon />}
            onClick={() => dispatch(clearCompletedHabits())}
            disabled={completedHabits === 0}
            sx={{ 
              borderRadius: 2, 
              borderWidth: 2,
              '&:hover': { borderWidth: 2 } 
            }}
          >
            Limpar Concluídos
          </Button>
        </Box>

        {/* Lista de Hábitos */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredHabits.map(habit => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </Box>
        
        {habits.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8, border: '2px dashed', borderColor: 'divider', borderRadius: 4, mt: 2 }}>
            <Typography variant="h6" color="text.secondary" mb={1}>
              Nenhum hábito cadastrado.
            </Typography>
            <Typography color="text.secondary">
              Utilize o painel acima para dar o primeiro passo!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;