"use client";

import { cn } from "@/lib/utils";
import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactElement,
  isValidElement,
  cloneElement,
} from "react";
import { colors } from "@/lib/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "navy"
    | "navy-outline"
    | "outline"
    | "ghost"
    | "white"
    | "white-outline"
    | "danger";
  size?: "sm" | "md" | "lg";
  shape?: "default" | "circle";
  isIconOnly?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shape = "default",
      isIconOnly,
      isLoading,
      asChild,
      children,
      style: userStyle,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md";

    const shapeStyles = {
      default: "rounded-lg",
      circle: "rounded-full",
    };

    const iconOnlySizes = {
      sm: "p-1.5",
      md: "p-2",
      lg: "p-2.5",
    };

    const textSizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variants: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: colors.primary.DEFAULT,
        color: colors.neutral.white,
      },
      secondary: {
        backgroundColor: colors.primary.navy.DEFAULT,
        color: colors.neutral.white,
      },
      navy: {
        backgroundColor: colors.primary.navy.DEFAULT,
        color: colors.neutral.white,
      },
      "navy-outline": {
        border: `2px solid ${colors.primary.navy.DEFAULT}`,
        color: colors.primary.navy.DEFAULT,
        backgroundColor: "transparent",
      },
      outline: {
        border: `2px solid ${colors.primary.DEFAULT}`,
        color: colors.primary.DEFAULT,
        backgroundColor: "transparent",
      },
      ghost: {
        color: colors.neutral.foreground,
        backgroundColor: "transparent",
      },
      white: {
        backgroundColor: colors.neutral.white,
        color: colors.primary.navy.DEFAULT,
      },
      "white-outline": {
        border: `2px solid ${colors.neutral.white}`,
        color: colors.neutral.white,
        backgroundColor: "transparent",
      },
      danger: {
        backgroundColor: colors.primary.DEFAULT,
        color: colors.neutral.white,
      },
    };

    const hoverStyles: Record<string, React.CSSProperties> = {
      primary: { backgroundColor: colors.primary.dark.DEFAULT },
      secondary: { backgroundColor: colors.primary.navy.s80 },
      navy: { backgroundColor: colors.primary.navy.s80 },
      "navy-outline": {
        backgroundColor: colors.primary.navy.DEFAULT,
        color: colors.neutral.white,
      },
      outline: {
        backgroundColor: colors.primary.DEFAULT,
        color: colors.neutral.white,
      },
      ghost: { backgroundColor: colors.gray[100] },
      white: { backgroundColor: colors.gray[100] },
      "white-outline": {
        backgroundColor: colors.neutral.white,
        color: colors.primary.navy.DEFAULT,
      },
      danger: { backgroundColor: colors.primary.dark.DEFAULT },
    };

    const sizeClass = isIconOnly ? iconOnlySizes[size] : textSizes[size];
    const mergedClassName = cn(baseStyles, shapeStyles[shape], sizeClass, className);

    const variantStyle = variants[variant] || variants.primary;
    const hoverStyle = hoverStyles[variant] || hoverStyles.primary;

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<Record<string, unknown>>;
      const childClassName = child.props.className as string | undefined;
      const childStyle = child.props.style as React.CSSProperties | undefined;
      const childOnMouseEnter = child.props.onMouseEnter as
        | ((e: React.MouseEvent<HTMLElement>) => void)
        | undefined;
      const childOnMouseLeave = child.props.onMouseLeave as
        | ((e: React.MouseEvent<HTMLElement>) => void)
        | undefined;
      const childDisabled = child.props.disabled as boolean | undefined;
      return cloneElement(child, {
        className: cn(mergedClassName, childClassName),
        style: { ...variantStyle, ...userStyle, ...childStyle },
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
          Object.assign(e.currentTarget.style, hoverStyle);
          childOnMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
          Object.assign(e.currentTarget.style, { ...variantStyle, ...userStyle });
          childOnMouseLeave?.(e);
        },
        ref,
        disabled: isLoading || props.disabled || childDisabled,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={mergedClassName}
        style={{ ...variantStyle, ...userStyle }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, hoverStyle);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, { ...variantStyle, ...userStyle });
        }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
