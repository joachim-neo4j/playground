import React, { useReducer, useRef, useCallback, useEffect } from 'react';
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
  START_EDIT_TEXT: 'START_EDIT_TEXT',
  STOP_EDIT_TEXT: 'STOP_EDIT_TEXT',
};

// Initial state
const initialState = {
  objects: [],
  selectedObjectId: null,
  editingTextId: null, // ID of text object being edited
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

    case ActionTypes.START_EDIT_TEXT:
      return {
        ...state,
        editingTextId: action.id,
      };

    case ActionTypes.STOP_EDIT_TEXT:
      return {
        ...state,
        editingTextId: null,
      };

    default:
      return state;
  }
}

// Toolbar Component
function Toolbar({ tool, onToolChange, onUndo, onRedo, canUndo, canRedo }) {
  const [hoveredButton, setHoveredButton] = React.useState(null);
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
  const buttonRefs = React.useRef({});

  const SelectIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
      <path d="M16.3229 22.0811L11.9385 14.4876M11.9385 14.4876L8.6037 19.5387L5.09035 2.62536L17.9807 14.1249L11.9385 14.4876Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );

  const TextIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
      <path d="M3.60001 5.4V4.8016C3.5998 4.56509 3.6462 4.33085 3.73656 4.11228C3.82693 3.89371 3.95948 3.69509 4.12665 3.52777C4.29381 3.36046 4.49232 3.22773 4.71081 3.13717C4.9293 3.04661 5.16349 3 5.40001 3H18.6C18.8365 3 19.0707 3.04661 19.2892 3.13717C19.5077 3.22773 19.7062 3.36046 19.8734 3.52777C20.0405 3.69509 20.1731 3.89371 20.2634 4.11228C20.3538 4.33085 20.4002 4.56509 20.4 4.8016V5.4016M11.9996 3V21M8.39896 20.9999H15.599" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );

  const StickyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="h-5 w-5">
      <path d="M320-184.62v-391q0-26.84 19-45.61T384.85-640h390.53q26.85 0 45.74 18.88Q840-602.23 840-575.38v278.46L663.08-120H384.62q-26.85 0-45.74-18.88Q320-157.77 320-184.62ZM121-696.15q-5.23-26.85 10.31-48.35 15.54-21.5 42.38-26.73L558.46-839q26.85-5.23 48.35 10.31 21.5 15.54 26.73 42.38l8.46 50.93h-40.46l-8.54-47.7q-1.54-8.46-9.23-13.46T566.85-800l-386.08 68.54q-10.77 1.54-16.15 10-5.39 8.46-3.85 19.23l63.85 360.61v77.47q-13.7-6.7-23.27-19-9.58-12.31-12.58-28.23L121-696.15Zm239 120.77v390.76q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92H640v-160h160v-255.38q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H384.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7ZM580-380Z"/>
    </svg>
  );

  const tools = [
    { id: 'select', label: 'Select', Icon: SelectIcon },
    { id: 'sticky', label: 'Sticky', Icon: StickyIcon },
    { id: 'rectangle', label: 'Rectangle', Icon: RectangleGroupIconOutline },
    { id: 'text', label: 'Text', Icon: TextIcon },
    { id: 'hand', label: 'Hand', Icon: HandRaisedIconOutline },
  ];

  const handleMouseEnter = (buttonId, label) => (e) => {
    setHoveredButton(buttonId);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8, // Position above the button
    });
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <>
      {hoveredButton && (
        <div
          className="toolbar-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
            backgroundColor: '#1f2937',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10000,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          {hoveredButton === 'undo' ? 'Undo' : hoveredButton === 'redo' ? 'Redo' : tools.find(t => t.id === hoveredButton)?.label}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #1f2937',
            }}
          />
        </div>
      )}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="rounded-lg border flex items-center gap-0.5 px-1 py-1"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#d1d5db',
            borderWidth: '1px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          {tools.map(t => {
            const Icon = t.Icon;
            return (
              <button
                key={t.id}
                ref={(el) => (buttonRefs.current[t.id] = el)}
                onClick={() => onToolChange(t.id)}
                onMouseEnter={handleMouseEnter(t.id, t.label)}
                onMouseLeave={handleMouseLeave}
                className={`toolbar-button rounded transition-colors flex items-center justify-center ${
                  tool === t.id
                    ? 'toolbar-button-selected'
                    : ''
                }`}
                style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', maxWidth: '32px', maxHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon className="h-5 w-5" style={{ color: '#4b5563', display: 'block' }} />
              </button>
            );
          })}
          <div className="w-px h-6 mx-0.5" style={{ backgroundColor: '#d1d5db' }} />
          <button
            ref={(el) => (buttonRefs.current['undo'] = el)}
            onClick={onUndo}
            disabled={!canUndo}
            onMouseEnter={handleMouseEnter('undo', 'Undo')}
            onMouseLeave={handleMouseLeave}
            className={`toolbar-button rounded transition-colors flex items-center justify-center ${
              canUndo ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'
            }`}
            style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', maxWidth: '32px', maxHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowUturnLeftIconOutline className="h-5 w-5" style={{ color: canUndo ? '#4b5563' : '#9ca3af', display: 'block' }} />
          </button>
          <button
            ref={(el) => (buttonRefs.current['redo'] = el)}
            onClick={onRedo}
            disabled={!canRedo}
            onMouseEnter={handleMouseEnter('redo', 'Redo')}
            onMouseLeave={handleMouseLeave}
            className={`toolbar-button rounded transition-colors flex items-center justify-center ${
              canRedo ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'
            }`}
            style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', maxWidth: '32px', maxHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowUturnRightIconOutline className="h-5 w-5" style={{ color: canRedo ? '#4b5563' : '#9ca3af', display: 'block' }} />
          </button>
        </div>
      </div>
    </>
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

function TextObject({ obj, isSelected, isEditing, onPointerDown, onDoubleClick, onUpdate, viewport }) {
  const inputRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState(obj.text || 'Text');

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  React.useEffect(() => {
    setInputValue(obj.text || 'Text');
  }, [obj.text]);

  const handleBlur = () => {
    onUpdate(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onUpdate(inputValue);
    } else if (e.key === 'Escape') {
      setInputValue(obj.text || 'Text');
      onUpdate(null); // Cancel editing
    }
  };

  if (isEditing) {
    // Position input in world coordinates (will be transformed by parent g element)
    return (
      <foreignObject
        x={0}
        y={-(obj.fontSize || 16)}
        width={Math.max(200, 200 / viewport.zoom)}
        height={(obj.fontSize || 16) * 1.5}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            fontSize: `${obj.fontSize || 16}px`,
            color: obj.color || '#000',
            border: '2px solid #3B82F6',
            borderRadius: '4px',
            padding: '2px 4px',
            outline: 'none',
            width: '100%',
            backgroundColor: 'white',
            fontFamily: 'inherit',
          }}
        />
      </foreignObject>
    );
  }

  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      style={{ cursor: isSelected ? 'move' : 'text' }}
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

function renderObject(obj, isSelected, isEditing, onPointerDown, onDoubleClick, onUpdate, viewport) {
  switch (obj.type) {
    case 'sticky':
      return <StickyNote key={obj.id} obj={obj} isSelected={isSelected} onPointerDown={onPointerDown} />;
    case 'rectangle':
      return <Rectangle key={obj.id} obj={obj} isSelected={isSelected} onPointerDown={onPointerDown} />;
    case 'text':
      return (
        <TextObject
          key={obj.id}
          obj={obj}
          isSelected={isSelected}
          isEditing={isEditing}
          onPointerDown={onPointerDown}
          onDoubleClick={onDoubleClick}
          onUpdate={onUpdate}
          viewport={viewport}
        />
      );
    default:
      return null;
  }
}

export default function Exploration1() {
  const [state, dispatch] = useReducer(whiteboardReducer, initialState);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
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
  }, [state.viewport, screenToWorld]);

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
    if (state.editingTextId === objId) {
      e.stopPropagation();
      return; // Don't start dragging if editing
    }
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
  }, [state.tool, state.objects, state.editingTextId, screenToWorld]);

  // Handle double-click on text object to start editing
  const handleTextDoubleClick = useCallback((e, objId) => {
    if (state.tool !== 'select') return;
    e.stopPropagation();
    e.preventDefault();
    const obj = state.objects.find(o => o.id === objId);
    if (obj && obj.type === 'text') {
      dispatch({ type: ActionTypes.SELECT_OBJECT, id: objId });
      dispatch({ type: ActionTypes.START_EDIT_TEXT, id: objId });
    }
  }, [state.tool, state.objects]);

  // Handle text update
  const handleTextUpdate = useCallback((objId, newText) => {
    if (newText === null) {
      // Cancel editing
      dispatch({ type: ActionTypes.STOP_EDIT_TEXT });
      return;
    }
    dispatch({
      type: ActionTypes.UPDATE_OBJECT,
      id: objId,
      updates: { text: newText },
    });
    dispatch({ type: ActionTypes.STOP_EDIT_TEXT });
  }, []);

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

  // Prevent scrolling on the container, but allow zoom on SVG
  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleWheelOnContainer = (e) => {
      // If the wheel event is on the SVG or its children, allow it for zoom
      // The SVG's onWheel handler will take care of it
      if (e.target === svg || svg.contains(e.target)) {
        // Don't prevent default - let the SVG's onWheel handle it
        return;
      }
      // Otherwise, prevent scrolling
      e.preventDefault();
      e.stopPropagation();
    };

    container.addEventListener('wheel', handleWheelOnContainer, { passive: false });
    container.addEventListener('touchmove', preventScroll, { passive: false });
    container.addEventListener('scroll', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheelOnContainer);
      container.removeEventListener('touchmove', preventScroll);
      container.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return (
    <Layout>
      <div 
        ref={containerRef}
        style={{ 
          backgroundColor: '#f5f6f6', 
          height: '100%', 
          width: '100%',
          position: 'relative', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ width: '100%', flex: 1, position: 'relative', overflow: 'hidden', height: 0 }}>
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
              display: 'block',
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
                  obj.id === state.editingTextId,
                  (e) => handleObjectPointerDown(e, obj.id),
                  (e) => handleTextDoubleClick(e, obj.id),
                  (newText) => handleTextUpdate(obj.id, newText),
                  state.viewport
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
