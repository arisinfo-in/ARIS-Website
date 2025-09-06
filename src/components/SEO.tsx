import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'ARIS AI Data Analyst - Expert Training & Consultancy | Transform Your Career',
  description = 'Master AI and data analytics with ARIS. Expert-led training programs, hands-on workshops, and AI consultancy services. Get certified in data science, machine learning, and AI analytics. Start your transformation today!',
  keywords = 'AI training, data analytics course, machine learning certification, AI consultancy, data science training, AI analyst, business intelligence, predictive analytics, AI workshops, data visualization, Python for AI, R programming, SQL analytics, AI career, data analyst jobs, AI skills, artificial intelligence training, data science bootcamp, AI certification program',
  image = 'https://aris-ai.com/og-image.jpg',
  url = 'https://aris-ai.com',
  type = 'website',
  structuredData,
}) => {
  const fullTitle = title.includes('ARIS') ? title : `${title} | ARIS AI Data Analyst`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="ARIS AI Data Analyst" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@ARIS_AI" />
      <meta name="twitter:creator" content="@ARIS_AI" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#f97316" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
