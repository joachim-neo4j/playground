import { useReducer, useRef, useCallback, useEffect } from 'react';
import Layout from '../components/Layout';
import {
  CursorArrowRaysIconOutline,
  RectangleStackIconOutline,
  RectangleGroupIconOutline,
  DocumentTextIconOutline,
  HandRaisedIconOutline,
  ArrowUturnLeftIconOutline,
  ArrowUturnRightIconOutline,
} from '@neo4j-ndl/react/icons';

// Action types
const ActionTypes = {
  ADD_OBJECT: 'ADD_OBJECT',
  UPDATE_OBJECT: 'UPDATE_OBJECT',
  DELETE_OBJECT: 'DELETE_OBJECT',
  SELECT_OBJECT: 'SELECT_OBJECT',
  DESELECT_ALL: 'DESELECT_ALL',
  MOVE_OBJECT: 'MOVE_OBJECT',
  SET_TOOL: 'SET_TOOL',
  SET_VIEWPORT: 'SET_VIEWPORT',
  UNDO: 'UNDO',
  REDO: 'REDO',
};

// Initial state
const initialState = {
  objects: [],
  selectedObjectId: null,
  tool: 'select', // 'select', 'sticky', 'rectangle', 'text', 'hand'
  viewport: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  history: {
    past: [],
    present: [],
    future: [],
  },
};

// Generate unique ID
let nextId = 1;
const generateId = () => `obj-${nextId++}`;

// Reducer
function whiteboardReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_OBJECT: {
      const newObject = {
        id: generateId(),
        type: action.objectType,
        x: action.x,
        y: action.y,
        width: action.width || 200,
        height: action.height || 100,
        text: action.text || '',
        color: action.color || '#FFEB3B',
        ...action.props,
      };
      const newObjects = [...state.objects, newObject];
      return {
        ...state,
        objects: newObjects,
        history: {
          past: [...state.history.past, state.objects],
          present: newObjects,
          future: [],
        },
      };
    }

    case ActionTypes.UPDATE_OBJECT: {
      const newObjects = state.objects.map(obj =>
        obj.id === action.id ? { ...obj, ...action.updates } : obj
      );
      return {
        ...state,
        objects: newObjects,
        history: {
          past: [...state.history.past, state.objects],
          present: newObjects,
          future: [],
        },
      };
    }

    case ActionTypes.DELETE_OBJECT: {
      const newObjects = state.objects.filter(obj => obj.id !== action.id);
      return {
        ...state,
        objects: newObjects,
        selectedObjectId: state.selectedObjectId === action.id ? null : state.selectedObjectId,
        history: {
          past: [...state.history.past, state.objects],
          present: newObjects,
          future: [],
        },
      };
    }

    case ActionTypes.SELECT_OBJECT:
      return {
        ...state,
        selectedObjectId: action.id,
      };

    case ActionTypes.DESELECT_ALL:
      return {
        ...state,
        selectedObjectId: null,
      };

    case ActionTypes.MOVE_OBJECT: {
      const newObjects = state.objects.map(obj =>
        obj.id === action.id
          ? { ...obj, x: action.x, y: action.y }
          : obj
      );
      return {
        ...state,
        objects: newObjects,
      };
    }

    case ActionTypes.SET_TOOL:
      return {
        ...state,
        tool: action.tool,
        selectedObjectId: null,
      };

    case ActionTypes.SET_VIEWPORT:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.viewport,
        },
      };

    case ActionTypes.UNDO: {
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);
      return {
        ...state,
        objects: previous,
        history: {
          past: newPast,
          present: previous,
          future: [state.objects, ...state.history.future],
        },
      };
    }

    case ActionTypes.REDO: {
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      return {
        ...state,
        objects: next,
        history: {
          past: [...state.history.past, state.objects],
          present: next,
          future: newFuture,
        },
      };
    }

    default:
      return state;
  }
}

// Toolbar Component
function Toolbar({ tool, onToolChange, onUndo, onRedo, canUndo, canRedo }) {
  const tools = [
    { id: 'select', label: 'Select', Icon: CursorArrowRaysIconOutline },
    { id: 'sticky', label: 'Sticky', Icon: RectangleStackIconOutline },
    { id: 'rectangle', label: 'Rectangle', Icon: RectangleGroupIconOutline },
    { id: 'text', label: 'Text', Icon: DocumentTextIconOutline },
    { id: 'hand', label: 'Hand', Icon: HandRaisedIconOutline },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className="rounded-lg border flex items-center gap-0.5 px-1 py-1"
        style={{
          backgroundColor: '#f5f5f5',
          borderColor: '#d1d5db',
          borderWidth: '1px',
        }}
      >
        {tools.map(t => {
          const Icon = t.Icon;
          return (
            <button
              key={t.id}
              onClick={() => onToolChange(t.id)}
              className={`px-2 py-1.5 rounded transition-colors ${
                tool === t.id
                  ? 'bg-gray-200'
                  : 'hover:bg-gray-100'
              }`}
              title={t.label}
            >
              <Icon className="h-5 w-5" style={{ color: '#4b5563' }} />
            </button>
          );
        })}
        <div className="w-px h-6 mx-0.5" style={{ backgroundColor: '#d1d5db' }} />
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`px-2 py-1.5 rounded transition-colors ${
            canUndo ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'
          }`}
          title="Undo"
        >
          <ArrowUturnLeftIconOutline className="h-5 w-5" style={{ color: canUndo ? '#4b5563' : '#9ca3af' }} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`px-2 py-1.5 rounded transition-colors ${
            canRedo ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'
          }`}
          title="Redo"
        >
          <ArrowUturnRightIconOutline className="h-5 w-5" style={{ color: canRedo ? '#4b5563' : '#9ca3af' }} />
        </button>
      </div>
    </div>
  );
}

// Object Components
function StickyNote({ obj, isSelected, onPointerDown }) {
  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={onPointerDown}
      style={{ cursor: 'move' }}
    >
      <rect
        width={obj.width}
        height={obj.height}
        fill={obj.color}
        stroke={isSelected ? '#3B82F6' : 'none'}
        strokeWidth={isSelected ? 2 : 0}
        rx={4}
        ry={4}
      />
      {obj.text && (
        <text
          x={10}
          y={25}
          fontSize={14}
          fill="#333"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {obj.text}
        </text>
      )}
    </g>
  );
}

function Rectangle({ obj, isSelected, onPointerDown }) {
  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={onPointerDown}
      style={{ cursor: 'move' }}
    >
      <rect
        width={obj.width}
        height={obj.height}
        fill="none"
        stroke={isSelected ? '#3B82F6' : obj.color || '#000'}
        strokeWidth={2}
      />
    </g>
  );
}

function TextObject({ obj, isSelected, onPointerDown }) {
  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={onPointerDown}
      style={{ cursor: 'move' }}
    >
      <text
        x={0}
        y={0}
        fontSize={obj.fontSize || 16}
        fill={obj.color || '#000'}
        stroke={isSelected ? '#3B82F6' : 'none'}
        strokeWidth={isSelected ? 1 : 0}
      >
        {obj.text || 'Text'}
      </text>
    </g>
  );
}

function renderObject(obj, isSelected, onPointerDown) {
  switch (obj.type) {
    case 'sticky':
      return <StickyNote key={obj.id} obj={obj} isSelected={isSelected} onPointerDown={onPointerDown} />;
    case 'rectangle':
      return <Rectangle key={obj.id} obj={obj} isSelected={isSelected} onPointerDown={onPointerDown} />;
    case 'text':
      return <TextObject key={obj.id} obj={obj} isSelected={isSelected} onPointerDown={onPointerDown} />;
    default:
      return null;
  }
}

export default function Exploration1() {
  const [state, dispatch] = useReducer(whiteboardReducer, initialState);
  const svgRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragObjectId = useRef(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  // Convert screen coordinates to world coordinates
  const screenToWorld = useCallback((screenX, screenY) => {
    const { x, y, zoom } = state.viewport;
    return {
      x: (screenX - x) / zoom,
      y: (screenY - y) / zoom,
    };
  }, [state.viewport]);

  // Handle pointer down
  const handlePointerDown = useCallback((e) => {
    if (e.button !== 0) return; // Only handle left mouse button
    
    const rect = svgRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const world = screenToWorld(screenX, screenY);

    if (state.tool === 'hand' || (state.tool === 'select' && e.shiftKey)) {
      isPanning.current = true;
      panStart.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
      return;
    }

    if (state.tool === 'select') {
      // Check if clicking on an object
      const clickedObject = [...state.objects]
        .reverse()
        .find(obj => {
          return (
            world.x >= obj.x &&
            world.x <= obj.x + obj.width &&
            world.y >= obj.y &&
            world.y <= obj.y + obj.height
          );
        });

      if (clickedObject) {
        dispatch({ type: ActionTypes.SELECT_OBJECT, id: clickedObject.id });
        isDragging.current = true;
        dragObjectId.current = clickedObject.id;
        dragStart.current = {
          x: world.x - clickedObject.x,
          y: world.y - clickedObject.y,
        };
      } else {
        dispatch({ type: ActionTypes.DESELECT_ALL });
      }
    } else if (['sticky', 'rectangle', 'text'].includes(state.tool)) {
      // Create new object
      const colors = {
        sticky: '#FFEB3B',
        rectangle: '#2196F3',
        text: '#000000',
      };
      
      dispatch({
        type: ActionTypes.ADD_OBJECT,
        objectType: state.tool,
        x: world.x,
        y: world.y,
        width: state.tool === 'sticky' ? 200 : state.tool === 'rectangle' ? 150 : 0,
        height: state.tool === 'sticky' ? 100 : state.tool === 'rectangle' ? 100 : 0,
        text: state.tool === 'text' ? 'Text' : state.tool === 'sticky' ? 'Note' : '',
        color: colors[state.tool],
        fontSize: 16,
      });
      
      // Switch back to select tool after creating
      dispatch({ type: ActionTypes.SET_TOOL, tool: 'select' });
    }

    e.preventDefault();
  }, [state.tool, state.objects, screenToWorld]);

  // Handle pointer move
  const handlePointerMove = useCallback((e) => {
    if (isPanning.current) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      dispatch({
        type: ActionTypes.SET_VIEWPORT,
        viewport: {
          x: state.viewport.x + dx,
          y: state.viewport.y + dy,
        },
      });
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (isDragging.current && dragObjectId.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      const world = screenToWorld(screenX, screenY);

      dispatch({
        type: ActionTypes.MOVE_OBJECT,
        id: dragObjectId.current,
        x: world.x - dragStart.current.x,
        y: world.y - dragStart.current.y,
      });
    }
  }, [isPanning.current, isDragging.current, dragObjectId.current, state.viewport, screenToWorld]);

  // Handle pointer up
  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    dragObjectId.current = null;
    isPanning.current = false;
  }, []);

  // Handle wheel zoom (including pinch zoom on trackpad)
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = svgRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    // Support pinch zoom on trackpad (e.ctrlKey indicates pinch gesture)
    let zoomFactor;
    if (e.ctrlKey || e.metaKey) {
      // Pinch zoom - use deltaY directly
      zoomFactor = 1 - (e.deltaY * 0.01);
    } else {
      // Regular scroll zoom
      zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    }
    
    const newZoom = Math.max(0.1, Math.min(3, state.viewport.zoom * zoomFactor));

    // Zoom towards mouse position
    const worldBefore = screenToWorld(screenX, screenY);
    const newX = screenX - worldBefore.x * newZoom;
    const newY = screenY - worldBefore.y * newZoom;

    dispatch({
      type: ActionTypes.SET_VIEWPORT,
      viewport: {
        x: newX,
        y: newY,
        zoom: newZoom,
      },
    });
  }, [state.viewport.zoom, screenToWorld]);

  // Handle object pointer down
  const handleObjectPointerDown = useCallback((e, objId) => {
    if (state.tool !== 'select') return;
    e.stopPropagation();
    const rect = svgRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const world = screenToWorld(screenX, screenY);
    const obj = state.objects.find(o => o.id === objId);
    
    if (obj) {
      dispatch({ type: ActionTypes.SELECT_OBJECT, id: objId });
      isDragging.current = true;
      dragObjectId.current = objId;
      dragStart.current = {
        x: world.x - obj.x,
        y: world.y - obj.y,
      };
    }
  }, [state.tool, state.objects, screenToWorld]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: ActionTypes.UNDO });
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        dispatch({ type: ActionTypes.REDO });
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedObjectId) {
          dispatch({ type: ActionTypes.DELETE_OBJECT, id: state.selectedObjectId });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedObjectId]);

  const canUndo = state.history.past.length > 0;
  const canRedo = state.history.future.length > 0;

  return (
    <Layout>
      <div 
        style={{ 
          backgroundColor: '#f5f6f6', 
          height: '100%', 
          width: '100%',
          position: 'relative', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onWheel={(e) => {
          // Prevent page scrolling when interacting with canvas
          if (e.target.closest('svg')) {
            e.preventDefault();
          }
        }}
      >
        <div style={{ width: '100%', flex: 1, position: 'relative', overflow: 'hidden' }}>
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            style={{
              background: '#f5f5f5',
              backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              cursor: state.tool === 'hand' ? 'grab' : state.tool === 'select' ? 'default' : 'crosshair',
              touchAction: 'none',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
          >
            <g
              transform={`translate(${state.viewport.x}, ${state.viewport.y}) scale(${state.viewport.zoom})`}
            >
              {state.objects.map(obj =>
                renderObject(
                  obj,
                  obj.id === state.selectedObjectId,
                  (e) => handleObjectPointerDown(e, obj.id)
                )
              )}
            </g>
          </svg>
        </div>
        <Toolbar
          tool={state.tool}
          onToolChange={(tool) => dispatch({ type: ActionTypes.SET_TOOL, tool })}
          onUndo={() => dispatch({ type: ActionTypes.UNDO })}
          onRedo={() => dispatch({ type: ActionTypes.REDO })}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>
    </Layout>
  );
}
