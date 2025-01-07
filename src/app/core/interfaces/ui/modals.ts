export interface ModalFeedback {
  show: boolean;
  type: 'success' | 'error' | 'loading';
  message?: string;
}
