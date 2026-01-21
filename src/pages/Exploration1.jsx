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
  TrashIconOutline,
  Square2StackIconOutline,
  ArrowUpIconOutline,
  ArrowDownIconOutline,
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
  DUPLICATE_OBJECT: 'DUPLICATE_OBJECT',
  BRING_TO_FRONT: 'BRING_TO_FRONT',
  SEND_TO_BACK: 'SEND_TO_BACK',
  RESIZE_OBJECT: 'RESIZE_OBJECT',
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

    case ActionTypes.DUPLICATE_OBJECT:
      const objToDuplicate = state.objects.find(o => o.id === action.id);
      if (!objToDuplicate) return state;
      const newId = `obj-${Date.now()}-${Math.random()}`;
      return {
        ...state,
        objects: [
          ...state.objects,
          {
            ...objToDuplicate,
            id: newId,
            x: objToDuplicate.x + 20,
            y: objToDuplicate.y + 20,
          },
        ],
        history: {
          past: [...state.history.past, state.objects],
          present: null,
          future: [],
        },
      };

    case ActionTypes.BRING_TO_FRONT:
      const objToFront = state.objects.find(o => o.id === action.id);
      if (!objToFront) return state;
      return {
        ...state,
        objects: [
          ...state.objects.filter(o => o.id !== action.id),
          objToFront,
        ],
        history: {
          past: [...state.history.past, state.objects],
          present: null,
          future: [],
        },
      };

    case ActionTypes.SEND_TO_BACK:
      const objToBack = state.objects.find(o => o.id === action.id);
      if (!objToBack) return state;
      return {
        ...state,
        objects: [
          objToBack,
          ...state.objects.filter(o => o.id !== action.id),
        ],
        history: {
          past: [...state.history.past, state.objects],
          present: null,
          future: [],
        },
      };

    case ActionTypes.RESIZE_OBJECT:
      const resizedObj = state.objects.find(o => o.id === action.id);
      if (!resizedObj) return state;
      
      // For text objects, scale font-size proportionally
      let updates = {
        x: action.x !== undefined ? action.x : resizedObj.x,
        y: action.y !== undefined ? action.y : resizedObj.y,
        width: Math.max(50, action.width || resizedObj.width),
        height: Math.max(20, action.height || resizedObj.height),
      };
      
      if (resizedObj.type === 'text' && action.width && action.height) {
        // Calculate scale factor based on width (or average of width/height)
        const widthScale = action.width / (resizedObj.width || 200);
        const heightScale = action.height / (resizedObj.height || 30);
        const scale = (widthScale + heightScale) / 2; // Average scale
        const newFontSize = Math.max(8, Math.round((resizedObj.fontSize || 16) * scale));
        updates.fontSize = newFontSize;
      }
      
      return {
        ...state,
        objects: state.objects.map(obj =>
          obj.id === action.id
            ? { ...obj, ...updates }
            : obj
        ),
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
      <path d="M212.31-200H560v-200h200v-347.69q0-5.39-3.46-8.85t-8.85-3.46H212.31q-5.39 0-8.85 3.46t-3.46 8.85v535.38q0 5.39 3.46 8.85t8.85 3.46Zm0 60q-29.92 0-51.12-21.19Q140-182.39 140-212.31v-535.38q0-29.92 21.19-51.12Q182.39-820 212.31-820h535.38q29.92 0 51.12 21.19Q820-777.61 820-747.69v373.46L585.77-140H212.31Zm85.38-270.77v-60H480v60H297.69Zm0-159.23v-60h364.62v60H297.69ZM200-200V-760v560Z"/>
    </svg>
  );

  const RectangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="h-5 w-5">
      <path d="M595.38-364.62ZM335.39-241.23q7.3.61 14.25.92 6.94.31 14.98.31 8.46 0 15.76-.31 7.31-.31 15-.92v64.31q0 5.38 3.47 8.84 3.46 3.46 8.84 3.46h375.39q5.38 0 8.84-3.46t3.46-8.84v-375.39q0-5.38-3.46-8.84-3.46-3.47-8.84-3.47h-64.31q.61-7.69.92-15 .31-7.3.31-15.76 0-8.04-.31-14.98-.31-6.95-.92-14.25h64.31q29.82 0 51.06 21.24 21.24 21.24 21.24 51.06v375.39q0 29.82-21.24 51.06-21.24 21.24-51.06 21.24H407.69q-29.82 0-51.06-21.24-21.24-21.24-21.24-51.06v-64.31Zm29.3-94.16q-108.61 0-184.34-75.65-75.73-75.66-75.73-184.27 0-108.61 75.65-184.34 75.66-75.73 184.27-75.73 108.61 0 184.34 75.65 75.73 75.66 75.73 184.27 0 108.61-75.65 184.34-75.66 75.73-184.27 75.73Zm-.07-59.99q83 0 141.5-58.5t58.5-141.5q0-83-58.5-141.5t-141.5-58.5q-83 0-141.5 58.5t-58.5 141.5q0 83 58.5 141.5t141.5 58.5Zm0-200Z"/>
    </svg>
  );

  const tools = [
    { id: 'select', label: 'Select', Icon: SelectIcon },
    { id: 'sticky', label: 'Sticky', Icon: StickyIcon },
    { id: 'rectangle', label: 'Rectangle', Icon: RectangleIcon },
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

// Zoom Toolbar Component
function ZoomToolbar({ zoom, onZoomIn, onZoomOut, onResetZoom }) {
  const [hoveredButton, setHoveredButton] = React.useState(null);
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

  const ZoomInIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
    </svg>
  );

  const ZoomOutIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
    </svg>
  );

  const handleMouseEnter = (buttonId) => (e) => {
    setHoveredButton(buttonId);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const zoomPercentage = Math.round(zoom * 100);

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
          {hoveredButton === 'zoom-in' ? 'Zoom in' : 'Zoom out'}
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
      <div className="absolute bottom-12 right-4 z-50">
        <div 
          className="rounded-lg border flex items-center gap-0.5 px-1 py-1"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#d1d5db',
            borderWidth: '1px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <button
            onClick={onZoomOut}
            onMouseEnter={handleMouseEnter('zoom-out')}
            onMouseLeave={handleMouseLeave}
            className="toolbar-button rounded transition-colors flex items-center justify-center"
            style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', maxWidth: '32px', maxHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <div 
            className="px-2 text-sm font-medium cursor-pointer" 
            style={{ color: '#4b5563', minWidth: '48px', textAlign: 'center' }}
            onDoubleClick={onResetZoom}
            title="Double-click to reset zoom to 100%"
          >
            {zoomPercentage}%
          </div>
          <button
            onClick={onZoomIn}
            onMouseEnter={handleMouseEnter('zoom-in')}
            onMouseLeave={handleMouseLeave}
            className="toolbar-button rounded transition-colors flex items-center justify-center"
            style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', maxWidth: '32px', maxHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Zoom in"
          >
            <ZoomInIcon />
          </button>
        </div>
      </div>
    </>
  );
}

// Floating Toolbar Component (appears above selected items)
function FloatingToolbar({ obj, viewport, svgRef, onDelete, onDuplicate, onColorChange, onBringToFront, onSendToBack }) {
  const toolbarRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  // Convert world coordinates to screen coordinates
  const worldToScreen = React.useCallback((worldX, worldY) => {
    const { x, y, zoom } = viewport;
    return {
      x: worldX * zoom + x,
      y: worldY * zoom + y,
    };
  }, [viewport]);

  // Update position when object or viewport changes
  React.useEffect(() => {
    if (!obj || !svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const screenPos = worldToScreen(obj.x + obj.width / 2, obj.y);
    
    // Position toolbar above the object
    setPosition({
      x: rect.left + screenPos.x,
      y: rect.top + screenPos.y - 50, // 50px above the object
    });
  }, [obj, viewport, worldToScreen, svgRef]);

  if (!obj) return null;

  const colorOptions = [
    '#D4EDDA', // Light green
    '#FFFFFF', // White
    '#FFE5E5', // Light red
    '#E5E5FF', // Light blue
    '#FFF5E5', // Light orange
    '#E5FFE5', // Light green
    '#F0E5FF', // Light purple
    '#FFE5F0', // Light pink
    '#A8D5BA', // Darker green
    '#E0E0E0', // Light gray
    '#FFB3B3', // Darker red
    '#B3B3FF', // Darker blue
    '#FFD9B3', // Darker orange
    '#B3FFB3', // Darker green
    '#D9B3FF', // Darker purple
    '#FFB3D9', // Darker pink
  ];

  const supportsColor = ['sticky', 'rectangle', 'text'].includes(obj.type);

  return (
    <div
      ref={toolbarRef}
      className="fixed z-[10001]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, 0)',
        pointerEvents: 'auto',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="rounded-lg border flex items-center gap-1 px-1 py-1"
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#d1d5db',
          borderWidth: '1px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Color picker (circle) for sticky, rectangle, and text */}
        {supportsColor && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
              className="toolbar-button rounded transition-colors flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                padding: '6px',
              }}
              title="Change color"
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: obj.color || '#D4EDDA',
                  border: '1px solid #d1d5db',
                }}
              />
            </button>
            {showColorPicker && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 rounded-lg border p-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: '#d1d5db',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '4px',
                }}
              >
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={(e) => {
                      e.stopPropagation();
                      onColorChange(color);
                      setShowColorPicker(false);
                    }}
                    style={{
                      width: '24px',
                      height: '24px',
                      minWidth: '24px',
                      minHeight: '24px',
                      maxWidth: '24px',
                      maxHeight: '24px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: obj.color === color ? '2px solid #3B82F6' : '1px solid #d1d5db',
                      cursor: 'pointer',
                      padding: 0,
                      flexShrink: 0,
                    }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Duplicate */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="toolbar-button rounded transition-colors flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            padding: '6px',
          }}
          title="Duplicate"
        >
          <Square2StackIconOutline className="h-5 w-5" />
        </button>

        {/* Bring to front */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBringToFront();
          }}
          className="toolbar-button rounded transition-colors flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            padding: '6px',
          }}
          title="Bring to front"
        >
          <ArrowUpIconOutline className="h-5 w-5" />
        </button>

        {/* Send to back */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSendToBack();
          }}
          className="toolbar-button rounded transition-colors flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            padding: '6px',
          }}
          title="Send to back"
        >
          <ArrowDownIconOutline className="h-5 w-5" />
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="toolbar-button rounded transition-colors flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            padding: '6px',
          }}
          title="Delete"
        >
          <TrashIconOutline className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// Object Components
function StickyNote({ obj, isSelected, isEditing, onPointerDown, onDoubleClick, onUpdate, viewport, textareaRef, onResizeHandleDown }) {
  // FigJam-style sticky note with shadow and better styling
  const shadowOffset = 3;
  const inputRef = React.useRef(null);
  
  // Share ref with parent
  React.useEffect(() => {
    if (textareaRef && isEditing) {
      textareaRef.current = inputRef.current;
    } else if (textareaRef) {
      textareaRef.current = null;
    }
  }, [isEditing, textareaRef]);
  const [inputValue, setInputValue] = React.useState(obj.text || '');

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  React.useEffect(() => {
    setInputValue(obj.text || '');
  }, [obj.text]);

  const handleBlur = () => {
    onUpdate(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      inputRef.current?.blur(); // This will trigger handleBlur
    } else if (e.key === 'Escape') {
      setInputValue(obj.text || '');
      onUpdate(null); // Cancel editing
    }
  };

  const handleSize = 8;

  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={isEditing ? undefined : onPointerDown}
      onDoubleClick={isEditing ? undefined : onDoubleClick}
      style={{ cursor: isEditing ? 'text' : 'move' }}
    >
      <defs>
        <filter id={`shadow-${obj.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx={2} dy={2} result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Main sticky note with shadow filter */}
      <rect
        width={obj.width}
        height={obj.height}
        fill={obj.color}
        stroke={isSelected ? '#3B82F6' : 'none'}
        strokeWidth={isSelected ? 2 : 0}
        rx={6}
        ry={6}
        filter={!isSelected ? `url(#shadow-${obj.id})` : undefined}
      />
      
      {/* Selection box */}
      {isSelected && !isEditing && (
        <rect
          x={0}
          y={0}
          width={obj.width}
          height={obj.height}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={2}
          strokeDasharray="4 4"
          rx={6}
          ry={6}
        />
      )}
      
      {/* Resize handles */}
      {isSelected && !isEditing && onResizeHandleDown && (
        <>
          {/* Top-left */}
          <rect
            x={-handleSize / 2}
            y={-handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nwse-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'nw');
            }}
          />
          {/* Top-right */}
          <rect
            x={obj.width - handleSize / 2}
            y={-handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nesw-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'ne');
            }}
          />
          {/* Bottom-left */}
          <rect
            x={-handleSize / 2}
            y={obj.height - handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nesw-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'sw');
            }}
          />
          {/* Bottom-right */}
          <rect
            x={obj.width - handleSize / 2}
            y={obj.height - handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nwse-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'se');
            }}
          />
        </>
      )}
      {/* Text or editable textarea */}
      {isEditing ? (
        <foreignObject x={16} y={16} width={obj.width - 32} height={obj.height - 32}>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={{
              fontSize: '14px',
              color: '#374151', // Dark gray text like the image
              fontFamily: 'inherit',
              lineHeight: '1.5',
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              resize: 'none',
              padding: 0,
              margin: 0,
            }}
          />
        </foreignObject>
      ) : (
        obj.text && (
          <foreignObject x={16} y={16} width={obj.width - 32} height={obj.height - 32}>
            <div
              style={{
                fontSize: '14px',
                color: '#374151', // Dark gray text like the image
                fontFamily: 'inherit',
                lineHeight: '1.5',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {obj.text}
            </div>
          </foreignObject>
        )
      )}
    </g>
  );
}

function Rectangle({ obj, isSelected, onPointerDown, onResizeHandleDown }) {
  const handleSize = 8;

  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={onPointerDown}
      style={{ cursor: 'move' }}
    >
      <rect
        width={obj.width}
        height={obj.height}
        fill={obj.color || '#FFFFFF'}
        stroke={isSelected ? '#3B82F6' : obj.color || '#000'}
        strokeWidth={2}
      />
      
      {/* Selection box */}
      {isSelected && (
        <rect
          x={0}
          y={0}
          width={obj.width}
          height={obj.height}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={2}
          strokeDasharray="4 4"
        />
      )}
      
      {/* Resize handles */}
      {isSelected && onResizeHandleDown && (
        <>
          {/* Top-left */}
          <rect
            x={-handleSize / 2}
            y={-handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nwse-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'nw');
            }}
          />
          {/* Top-right */}
          <rect
            x={obj.width - handleSize / 2}
            y={-handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nesw-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'ne');
            }}
          />
          {/* Bottom-left */}
          <rect
            x={-handleSize / 2}
            y={obj.height - handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nesw-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'sw');
            }}
          />
          {/* Bottom-right */}
          <rect
            x={obj.width - handleSize / 2}
            y={obj.height - handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nwse-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'se');
            }}
          />
        </>
      )}
    </g>
  );
}

function TextObject({ obj, isSelected, isEditing, onPointerDown, onDoubleClick, onUpdate, viewport, textareaRef, onResizeHandleDown }) {
  const inputRef = React.useRef(null);
  const textMeasureRef = React.useRef(null);
  const [textBounds, setTextBounds] = React.useState({ width: 0, height: 0 });
  
  // Share ref with parent
  React.useEffect(() => {
    if (textareaRef && isEditing) {
      textareaRef.current = inputRef.current;
    } else if (textareaRef) {
      textareaRef.current = null;
    }
  }, [isEditing, textareaRef]);
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

  // Measure text bounds when text or font size changes
  React.useEffect(() => {
    if (!isEditing && textMeasureRef.current) {
      const measureDiv = textMeasureRef.current;
      // Use scrollWidth and scrollHeight for accurate text measurement
      setTextBounds({
        width: measureDiv.scrollWidth,
        height: measureDiv.scrollHeight,
      });
    }
  }, [obj.text, obj.fontSize, isEditing, viewport.zoom]);

  const handleBlur = () => {
    onUpdate(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      inputRef.current?.blur(); // This will trigger handleBlur
    } else if (e.key === 'Escape') {
      setInputValue(obj.text || 'Text');
      onUpdate(null); // Cancel editing
    }
  };

  // Use measured text bounds for selection box, or fallback to object dimensions
  const selectionWidth = textBounds.width > 0 ? textBounds.width : (obj.width || 200);
  const selectionHeight = textBounds.height > 0 ? textBounds.height : (obj.height || 30);
  const handleSize = 8;

  return (
    <g
      transform={`translate(${obj.x}, ${obj.y})`}
      onPointerDown={isEditing ? undefined : onPointerDown}
      onDoubleClick={isEditing ? undefined : onDoubleClick}
      style={{ cursor: isEditing ? 'text' : isSelected ? 'move' : 'text' }}
    >
      {/* Selection box - hugging the text */}
      {isSelected && !isEditing && (
        <rect
          x={0}
          y={0}
          width={selectionWidth}
          height={selectionHeight}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={2}
        />
      )}
      
      {/* Resize handles */}
      {isSelected && !isEditing && onResizeHandleDown && (
        <>
          {/* Top-left */}
          <rect
            x={-handleSize / 2}
            y={-handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nwse-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'nw');
            }}
          />
          {/* Top-right */}
          <rect
            x={selectionWidth - handleSize / 2}
            y={-handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nesw-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'ne');
            }}
          />
          {/* Bottom-left */}
          <rect
            x={-handleSize / 2}
            y={selectionHeight - handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nesw-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'sw');
            }}
          />
          {/* Bottom-right */}
          <rect
            x={selectionWidth - handleSize / 2}
            y={selectionHeight - handleSize / 2}
            width={handleSize}
            height={handleSize}
            fill="#3B82F6"
            stroke="#ffffff"
            strokeWidth={1}
            style={{ cursor: 'nwse-resize' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown(e, 'se');
            }}
          />
        </>
      )}

      {isEditing ? (
        <foreignObject
          x={0}
          y={0}
          width={selectionWidth || 200}
          height={selectionHeight || 30}
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
              border: 'none',
              outline: 'none',
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              fontFamily: 'inherit',
              padding: 0,
              margin: 0,
              background: 'transparent',
            }}
          />
        </foreignObject>
      ) : (
        <foreignObject
          x={0}
          y={0}
          width={selectionWidth || 200}
          height={selectionHeight || 30}
        >
          <div
            ref={textMeasureRef}
            style={{
              fontSize: `${obj.fontSize || 16}px`,
              color: obj.color || '#000',
              fontFamily: 'inherit',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              lineHeight: '1.2',
            }}
          >
            {obj.text || 'Text'}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

function renderObject(obj, isSelected, isEditing, onPointerDown, onDoubleClick, onUpdate, viewport, textareaRef, onResizeHandleDown) {
  switch (obj.type) {
    case 'sticky':
      return (
        <StickyNote
          key={obj.id}
          obj={obj}
          isSelected={isSelected}
          isEditing={isEditing}
          onPointerDown={onPointerDown}
          onDoubleClick={onDoubleClick}
          onUpdate={onUpdate}
          viewport={viewport}
          textareaRef={textareaRef}
          onResizeHandleDown={onResizeHandleDown}
        />
      );
    case 'rectangle':
      return (
        <Rectangle
          key={obj.id}
          obj={obj}
          isSelected={isSelected}
          onPointerDown={onPointerDown}
          onResizeHandleDown={onResizeHandleDown}
        />
      );
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
          textareaRef={textareaRef}
          onResizeHandleDown={onResizeHandleDown}
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
  const [isPanningState, setIsPanningState] = React.useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const touchState = useRef({
    touches: [],
    lastCenter: { x: 0, y: 0 },
    isTwoFingerPan: false,
  });
  const isResizing = useRef(false);
  const resizeHandle = useRef(null);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

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
      setIsPanningState(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
      return;
    }

    // Check if clicking on an object (for all tools)
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

    if (state.tool === 'select') {
      // If editing a sticky note or text, save it when clicking outside
      if (state.editingTextId) {
        const editingObj = state.objects.find(o => o.id === state.editingTextId);
        if (editingObj && (editingObj.type === 'sticky' || editingObj.type === 'text')) {
          // Check if clicking outside the editing object
          const isClickInside = (
            world.x >= editingObj.x &&
            world.x <= editingObj.x + editingObj.width &&
            world.y >= editingObj.y &&
            world.y <= editingObj.y + editingObj.height
          );
          if (!isClickInside) {
            // Blur the textarea to trigger save and remove focus
            if (editingTextareaRef.current) {
              editingTextareaRef.current.blur();
            }
            // Also stop editing state immediately
            dispatch({ type: ActionTypes.STOP_EDIT_TEXT });
          }
        }
      }
      
      if (clickedObject) {
        dispatch({ type: ActionTypes.SELECT_OBJECT, id: clickedObject.id });
        isDragging.current = true;
        dragObjectId.current = clickedObject.id;
        dragStart.current = {
          x: world.x - clickedObject.x,
          y: world.y - clickedObject.y,
        };
      } else {
        // Clicking on empty canvas - deselect all
        dispatch({ type: ActionTypes.DESELECT_ALL });
      }
    } else if (['sticky', 'rectangle', 'text'].includes(state.tool)) {
      // Create new object
      const colors = {
        sticky: '#D4EDDA', // Light green color matching the screenshot
        rectangle: '#FFFFFF', // White background
        text: '#000000',
      };
      
      dispatch({
        type: ActionTypes.ADD_OBJECT,
        objectType: state.tool,
        x: world.x,
        y: world.y,
        width: state.tool === 'sticky' ? 200 : state.tool === 'rectangle' ? 150 : 200,
        height: state.tool === 'sticky' ? 200 : state.tool === 'rectangle' ? 100 : 30, // Square for sticky
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

    if (isResizing.current && resizeHandle.current && dragObjectId.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      const world = screenToWorld(screenX, screenY);
      const obj = state.objects.find(o => o.id === dragObjectId.current);
      if (!obj) return;

      const handle = resizeHandle.current;
      let newX = resizeStart.current.x;
      let newY = resizeStart.current.y;
      let newWidth = resizeStart.current.width;
      let newHeight = resizeStart.current.height;

      const deltaX = world.x - (resizeStart.current.x + resizeStart.current.width);
      const deltaY = world.y - (resizeStart.current.y + resizeStart.current.height);

      // Set minimum sizes based on object type
      const minWidth = obj.type === 'text' ? 50 : obj.type === 'sticky' ? 100 : 50;
      const minHeight = obj.type === 'text' ? 20 : obj.type === 'sticky' ? 100 : 30;

      if (handle === 'se') {
        // Bottom-right
        newWidth = Math.max(minWidth, resizeStart.current.width + deltaX);
        newHeight = Math.max(minHeight, resizeStart.current.height + deltaY);
      } else if (handle === 'sw') {
        // Bottom-left
        newWidth = Math.max(minWidth, resizeStart.current.width - deltaX);
        newHeight = Math.max(minHeight, resizeStart.current.height + deltaY);
        newX = resizeStart.current.x + resizeStart.current.width - newWidth;
      } else if (handle === 'ne') {
        // Top-right
        newWidth = Math.max(minWidth, resizeStart.current.width + deltaX);
        newHeight = Math.max(minHeight, resizeStart.current.height - deltaY);
        newY = resizeStart.current.y + resizeStart.current.height - newHeight;
      } else if (handle === 'nw') {
        // Top-left
        newWidth = Math.max(minWidth, resizeStart.current.width - deltaX);
        newHeight = Math.max(minHeight, resizeStart.current.height - deltaY);
        newX = resizeStart.current.x + resizeStart.current.width - newWidth;
        newY = resizeStart.current.y + resizeStart.current.height - newHeight;
      }

      dispatch({
        type: ActionTypes.RESIZE_OBJECT,
        id: dragObjectId.current,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
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
  }, [state.viewport, state.objects, screenToWorld]);

  // Handle pointer up
  const handlePointerUp = useCallback((e) => {
    isDragging.current = false;
    dragObjectId.current = null;
    isPanning.current = false;
    setIsPanningState(false);
    isResizing.current = false;
    resizeHandle.current = null;
    
    // Reset touch state
    touchState.current = {
      touches: [],
      lastCenter: { x: 0, y: 0 },
      isTwoFingerPan: false,
    };
  }, []);

  // Calculate distance between two touches
  const getTouchDistance = (touch1, touch2) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate center point between two touches
  const getTouchCenter = (touch1, touch2) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Handle touch start
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const center = getTouchCenter(touch1, touch2);
      
      touchState.current = {
        touches: [touch1, touch2],
        lastCenter: center,
        isTwoFingerPan: false,
      };
      
      e.preventDefault();
    } else if (e.touches.length === 1) {
      // Single touch - allow normal interaction
      touchState.current.touches = [e.touches[0]];
    }
  }, []);

  // Handle touch move
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const center = getTouchCenter(touch1, touch2);
      
      // Two finger pan only
      if (touchState.current.lastCenter.x !== 0 || touchState.current.lastCenter.y !== 0) {
        const dx = center.x - touchState.current.lastCenter.x;
        const dy = center.y - touchState.current.lastCenter.y;
        
        dispatch({
          type: ActionTypes.SET_VIEWPORT,
          viewport: {
            x: state.viewport.x + dx,
            y: state.viewport.y + dy,
            zoom: state.viewport.zoom,
          },
        });
      }
      
      touchState.current.lastCenter = center;
      touchState.current.isTwoFingerPan = true;
      
      e.preventDefault();
    }
  }, [state.viewport]);

  // Handle touch end
  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length < 2) {
      // Reset touch state when we have less than 2 touches
      touchState.current = {
        touches: [],
        lastDistance: 0,
        lastCenter: { x: 0, y: 0 },
        isPinching: false,
        isTwoFingerPan: false,
      };
    }
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
      // Regular scroll zoom - reduced to 5% steps
      zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
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

  // Handle double-click on text or sticky object to start editing
  const handleTextDoubleClick = useCallback((e, objId) => {
    if (state.tool !== 'select') return;
    e.stopPropagation();
    e.preventDefault();
    const obj = state.objects.find(o => o.id === objId);
    if (obj && (obj.type === 'text' || obj.type === 'sticky')) {
      dispatch({ type: ActionTypes.SELECT_OBJECT, id: objId });
      dispatch({ type: ActionTypes.START_EDIT_TEXT, id: objId });
    }
  }, [state.tool, state.objects, state.editingTextId]);

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

  // Ref to track editing textarea elements
  const editingTextareaRef = useRef(null);

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

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Add 10 percentage points (0.1) to zoom
    const newZoom = Math.max(0.1, Math.min(3, state.viewport.zoom + 0.1));
    
    const worldBefore = screenToWorld(centerX, centerY);
    const newX = centerX - worldBefore.x * newZoom;
    const newY = centerY - worldBefore.y * newZoom;
    
    dispatch({
      type: ActionTypes.SET_VIEWPORT,
      viewport: {
        x: newX,
        y: newY,
        zoom: newZoom,
      },
    });
  }, [state.viewport, screenToWorld]);

  const handleZoomOut = useCallback(() => {
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Subtract 10 percentage points (0.1) from zoom
    const newZoom = Math.max(0.1, Math.min(3, state.viewport.zoom - 0.1));
    
    const worldBefore = screenToWorld(centerX, centerY);
    const newX = centerX - worldBefore.x * newZoom;
    const newY = centerY - worldBefore.y * newZoom;
    
    dispatch({
      type: ActionTypes.SET_VIEWPORT,
      viewport: {
        x: newX,
        y: newY,
        zoom: newZoom,
      },
    });
  }, [state.viewport, screenToWorld]);

  const handleResetZoom = useCallback(() => {
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newZoom = 1; // Reset to 100%
    
    const worldBefore = screenToWorld(centerX, centerY);
    const newX = centerX - worldBefore.x * newZoom;
    const newY = centerY - worldBefore.y * newZoom;
    
    dispatch({
      type: ActionTypes.SET_VIEWPORT,
      viewport: {
        x: newX,
        y: newY,
        zoom: newZoom,
      },
    });
  }, [state.viewport, screenToWorld]);

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

  // Prevent scrolling on the parent main content area
  useEffect(() => {
    const mainElement = containerRef.current?.closest('main');
    if (mainElement) {
      const originalOverflow = mainElement.style.overflow;
      mainElement.style.overflow = 'hidden';
      
      return () => {
        mainElement.style.overflow = originalOverflow;
      };
    }
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
              backgroundSize: `${20 * state.viewport.zoom}px ${20 * state.viewport.zoom}px`,
              backgroundPosition: `${state.viewport.x}px ${state.viewport.y}px`,
              cursor: isPanningState ? 'grabbing' : state.tool === 'hand' ? 'grab' : state.tool === 'select' ? 'default' : 'crosshair',
              touchAction: 'none',
              display: 'block',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
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
                  state.viewport,
                  editingTextareaRef,
                  (e, handle) => {
                    e.stopPropagation();
                    isResizing.current = true;
                    resizeHandle.current = handle;
                    dragObjectId.current = obj.id;
                    const rect = svgRef.current.getBoundingClientRect();
                    const screenX = e.clientX - rect.left;
                    const screenY = e.clientY - rect.top;
                    const world = screenToWorld(screenX, screenY);
                    resizeStart.current = {
                      x: obj.x,
                      y: obj.y,
                      width: obj.width || 200,
                      height: obj.height || 30,
                      fontSize: obj.fontSize || 16,
                    };
                  }
                )
              )}
            </g>
          </svg>
        </div>
        {state.selectedObjectId && (
          <FloatingToolbar
            obj={state.objects.find(o => o.id === state.selectedObjectId)}
            viewport={state.viewport}
            svgRef={svgRef}
            onDelete={() => {
              if (state.selectedObjectId) {
                dispatch({ type: ActionTypes.DELETE_OBJECT, id: state.selectedObjectId });
                dispatch({ type: ActionTypes.DESELECT_ALL });
              }
            }}
            onDuplicate={() => {
              if (state.selectedObjectId) {
                dispatch({ type: ActionTypes.DUPLICATE_OBJECT, id: state.selectedObjectId });
              }
            }}
            onColorChange={(color) => {
              if (state.selectedObjectId) {
                dispatch({
                  type: ActionTypes.UPDATE_OBJECT,
                  id: state.selectedObjectId,
                  updates: { color },
                });
              }
            }}
            onBringToFront={() => {
              if (state.selectedObjectId) {
                dispatch({ type: ActionTypes.BRING_TO_FRONT, id: state.selectedObjectId });
              }
            }}
            onSendToBack={() => {
              if (state.selectedObjectId) {
                dispatch({ type: ActionTypes.SEND_TO_BACK, id: state.selectedObjectId });
              }
            }}
          />
        )}
        <Toolbar
          tool={state.tool}
          onToolChange={(tool) => dispatch({ type: ActionTypes.SET_TOOL, tool })}
          onUndo={() => dispatch({ type: ActionTypes.UNDO })}
          onRedo={() => dispatch({ type: ActionTypes.REDO })}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <ZoomToolbar
          zoom={state.viewport.zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />
      </div>
    </Layout>
  );
}
