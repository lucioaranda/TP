import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  datePickerButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  datePickerText: {
    fontSize: 16,
    color: '#111827',
  },

  button: {
    backgroundColor: '#1E3A8A',
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    textAlign: 'center',
    marginTop: 10,
    color: '#2563EB',
    fontWeight: '600',
  },

  taskCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },

  taskText: {
    fontSize: 18,
    color: '#111827',
  },

  taskDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },

  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },

  deleteButtonPressed: {
    backgroundColor: '#991B1B',
  },

  userMenuContainer: {
    marginLeft: 15,
  },

  userIcon: {
    fontSize: 28,
    marginRight: 10,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  logoutBox: {
    marginTop: 100,
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    width: 120,
    padding: 12,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#111827',
  },

  taskInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  taskInput: {
    flex: 1,
    marginBottom: 0,
  },

  imageCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },

  imagePlus: {
    fontSize: 28,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },

  taskImage: {
    width: '100%',
    height: '100%',
  },

  taskItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCircleSmall: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },

  taskImageSmall: {
    width: '100%',
    height: '100%',
  },

  imagePlusSmall: {
    fontSize: 24,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },

  taskInfo: {
    flex: 1,
  },

  locationButton: {
    borderWidth: 1,
    borderColor: '#1E3A8A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#EFF6FF',
  },

  locationButtonText: {
    color: '#1E3A8A',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  fakeMap: {
    height: 120,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  mapGridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#93C5FD',
  },

  mapGridLineVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: '#93C5FD',
  },

  mapMarker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },

  mapMarkerText: {
    fontSize: 24,
  },

  mapCoordinatesBox: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 6,
  },

  mapCoordinatesText: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  
  contactButton: {
  borderWidth: 1,
  borderColor: '#047857',
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
  backgroundColor: '#ECFDF5',
},

contactButtonText: {
  color: '#047857',
  textAlign: 'center',
  fontWeight: 'bold',
},

taskResponsible: {
  fontSize: 14,
  color: '#047857',
  marginTop: 5,
  fontWeight: '600',
},

});