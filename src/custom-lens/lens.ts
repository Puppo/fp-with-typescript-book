export type LensGet<T, A> = (obj: T) => A;
export type LensSet<T, A> = (obj: T) => (newValue: A) => T;
export interface Lens<T, A> {
  get: LensGet<T, A>;
  set: LensSet<T, A>;
}

export const propLens = function <T, K extends keyof T>(key: K): Lens<T, T[K]> {
  return {
    get: (obj: T): T[K] => obj[key],
    set:
      (obj: T) =>
      (value: T[K]): T => ({ ...obj, [key]: value }),
  };
};

export const composeLenses = <T, A, B>(
  lens1: Lens<A, B>,
  lens2: Lens<T, A>
): Lens<T, B> => ({
  get: (obj: T): B => lens1.get(lens2.get(obj)),
  set:
    (obj: T) =>
    (value: B): T =>
      lens2.set(obj)(lens1.set(lens2.get(obj))(value)),
});

export const view = <T, A>(lens: Lens<T, A>, obj: T): A => lens.get(obj);
export const set = <T, A>(lens: Lens<T, A>, obj: T, value: A): T =>
  lens.set(obj)(value);
export const over = <T, A, B>(lens: Lens<T, A>, f: (x: A) => A, obj: T): T =>
  lens.set(obj)(f(lens.get(obj)));
