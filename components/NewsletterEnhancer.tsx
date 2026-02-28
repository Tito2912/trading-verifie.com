'use client';

import { useEffect } from 'react';

export function NewsletterEnhancer() {
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll<HTMLFormElement>('form#newsletter-form'));
    if (!forms.length) return;

    const controller = new AbortController();
    const { signal } = controller;

    for (const form of forms) {
      form.addEventListener(
        'submit',
        (event) => {
          event.preventDefault();

          const section = form.closest('section') ?? form.parentElement;
          const popup =
            section?.querySelector<HTMLElement>('#popup-message') ??
            section?.querySelector<HTMLElement>('.popup-message') ??
            document.getElementById('popup-message');

          if (!popup) return;

          popup.classList.add('active');
          window.setTimeout(() => popup.classList.remove('active'), 10_000);
        },
        { signal },
      );
    }

    return () => controller.abort();
  }, []);

  return null;
}

