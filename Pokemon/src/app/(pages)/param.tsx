'use client'; // Важно для использования хуков и обработчиков событий

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UrlParamsModifier() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState('');

  // Обновляем отображение URL при изменении параметров
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [searchParams]);

  // Добавить или изменить параметры
  const handleAddParamsPage = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const handleAddParamsSort = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', 'asc');

    router.push(`?${params.toString()}`);
  };

  // Удалить конкретный параметр
  const handleRemoveParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">URL Parameters Modifier</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleAddParamsPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Params
        </button>
        <button
          onClick={handleAddParamsSort}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Params Sort
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Current Parameters:</h3>
        <ul className="space-y-1">
          {Array.from(searchParams.entries()).map(([key, value]) => (
            <li key={key} className="flex justify-between items-center">
              <span>
                <strong>{key}:</strong> {value}
              </span>
              <button
                onClick={() => handleRemoveParam(key)}
                className="text-red-500 hover:text-red-700">
                ×
              </button>
            </li>
          ))}
          {searchParams.size === 0 && <li>No parameters</li>}
        </ul>
      </div>

      <div className="p-3 bg-gray-100 rounded break-all">
        <strong>Current URL:</strong> {currentUrl}
      </div>
    </div>
  );
}
