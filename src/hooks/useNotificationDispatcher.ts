import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface INotifictaion {
  successMessage: string;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  isLoading: boolean;
}

const useNotificationDispatcher = ({
  successMessage,
  isSuccess,
  isError,
  error,
  isLoading,
}: INotifictaion) => {
  useEffect(() => {
    if (isSuccess && successMessage) {
      toast.success(successMessage);
    }

    if (isError) {
      const err: any = error;
      if (Array.isArray((err as any)?.data?.error)) {
        (err as any)?.data?.error.forEach((el: any) =>
          toast.error(el?.message, {
            position: 'top-right',
            theme: 'colored',
          })
        );
      } else if (err?.status == 'FETCH_ERROR') {
        toast.error('Server unreachable', {
          position: 'top-right',
          theme: 'colored',
        });
      } else {
        toast.error((err as any)?.data?.message, {
          position: 'top-right',
          theme: 'colored',
        });
      }
    }
  }, [isLoading]);
};

export default useNotificationDispatcher;
