import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def _get_raw_dataframe():
    gusurl = 'https://stat.gov.pl/obszary-tematyczne/ceny-handel/wskazniki-cen/wskazniki-cen-towarow-i-uslug-konsumpcyjnych-pot-inflacja-/miesieczne-wskazniki-cen-towarow-i-uslug-konsumpcyjnych-od-1982-roku/'

    raw_df = pd.read_html(gusurl)[0] # only one element on the list

    return raw_df

def _sanitize_dataframe(df):
    df.columns = df.columns.droplevel() # useless multiindex
    df = df[df['Wyszczególnienie'] == 'Poprzedni  miesiąc = 100'] # select one of the tables
    df = df.iloc[:, 1:] # get rid of 'poprzedni miesiąc = 100' column
    df.iloc[:, 1:] = df.iloc[:, 1:].astype('float64') 
    df.iloc[:, 1:] = df.iloc[:, 1:].apply(lambda x: x/1000) # normalize
    df['Rok'] = df['Rok'].str.strip('abcde') # get rid of alphabetical indices
    df.iloc[:, 0] = df.iloc[:, 0].astype('int64')
    df = df.set_index('Rok')
    df.columns = range(1, 13) # change columns from roman numerals to arabic
    return df

def _get_product(month, year, df):
    flat_df = df[df.columns[::-1]].T.unstack()
    prod = 1
    prod *= flat_df.loc[year, :month].prod()
    if year+1 <= flat_df.index[0][0]:
        prod *= flat_df.loc[:year+1].prod()
    return prod

def convert_to_past(today_amount, month, year, df):
    return today_amount / _get_product(month, year, df)

def convert_to_today(past_amount, month, year, df):
    return past_amount * _get_product(month, year, df)

if __name__ == '__main__':
    df = _get_raw_dataframe()
    df = _sanitize_dataframe(df)
    print(convert_to_today(500, 10, 2015, df))
