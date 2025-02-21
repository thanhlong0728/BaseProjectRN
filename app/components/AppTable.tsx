/* eslint-disable react-native/no-inline-styles */
import { Colors, FontSizes, Layout } from '@/theme'
import React from 'react'
import { FlatList, Pressable, View, ViewStyle } from 'react-native'
import AppText from './AppText'
import { ScaledSheet } from 'react-native-size-matters'
import Spacer from './Spacer'
import AppRefreshControl from './AppRefreshControl'

export interface ColDataType {
  title: string
  dataIndex: string
  key: string
  width?: ViewStyle['width']
  render?: (v: any, index: number) => JSX.Element | React.ReactNode
}

interface AppTableProps {
  columns: ColDataType[]
  dataSource: any
  onLoadMore?: () => void
  onPressRow?: (item: any) => void
  refreshing?: boolean
  onRefresh?: () => void
  uniqueKey?: string
  rowDiff?: boolean
  EmptyComponent?: () => React.ReactNode
  colNumberOfLines?: number
  hightlightRowIndex?: number
}

const AppTable = ({
  dataSource = [],
  columns = [],
  uniqueKey = 'id',
  onLoadMore,
  onPressRow,
  onRefresh,
  hightlightRowIndex,
  rowDiff = true,
  EmptyComponent,
  refreshing = false,
  colNumberOfLines = 1,
}: AppTableProps) => {
  const pressRow = React.useCallback(
    (item: any) => () => {
      onPressRow && onPressRow(item)
    },
    [onPressRow],
  )
  const renderRow = React.useCallback(
    ({ item, index }: any) => {
      return (
        <Pressable
          style={[
            styles.itemRow,
            typeof hightlightRowIndex === 'number' && index === hightlightRowIndex
              ? { backgroundColor: Colors.KA8DC83 }
              : {},
            index === dataSource.length - 1 && { borderBottomWidth: 0 },
          ]}
          onPress={pressRow(item)}>
          {columns.map((col, i: number) => {
            return (
              <View key={`${col.key}-${i}`} style={[Layout.fill, col.width ? { flex: 0, width: col.width } : {}]}>
                {col.render ? (
                  col.render(item, index)
                ) : (
                  <AppText fontSize={FontSizes.normal} fontWeight={400} numberOfLines={colNumberOfLines}>
                    {item[col.dataIndex]}
                  </AppText>
                )}
              </View>
            )
          })}
        </Pressable>
      )
    },
    [colNumberOfLines, columns, dataSource.length, hightlightRowIndex, pressRow],
  )

  const keyExtractor = React.useCallback((item: any) => item[uniqueKey], [uniqueKey])

  return (
    <View style={[styles.table]}>
      <View style={[styles.headerRow]}>
        {columns.map((col, index: number) => {
          return (
            <View
              key={`${col.key}-${index}`}
              style={[Layout.fill, col.width ? { flex: undefined, width: col.width } : {}]}>
              <AppText fontSize={FontSizes.small} fontWeight={600} color={Colors.mainDark}>
                {col.title}
              </AppText>
            </View>
          )
        })}
      </View>
      <FlatList
        scrollIndicatorInsets={{ right: -2 }}
        data={dataSource}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        refreshControl={
          <AppRefreshControl
            onRefresh={() => {
              onRefresh && onRefresh()
            }}
          />
        }
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        scrollEventThrottle={16}
      />
      <Spacer mode="vertical" size={4} />
    </View>
  )
}

export const styles = ScaledSheet.create({
  table: {
    flex: 1,
    backgroundColor: Colors.mainLight,
    borderWidth: '1@ms',
    borderColor: Colors.mainDark,
    borderRadius: '8@ms',
  },
  headerRow: {
    width: '100%',
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
    gap: 8,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.mainDark,
    borderBottomWidth: '1@ms',
    borderTopLeftRadius: '8@ms',
    borderTopRightRadius: '8@ms',
    flexDirection: 'row',
  },
  itemRow: {
    width: '100%',
    gap: '8@ms',
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
    borderBottomWidth: '1@ms',
    borderColor: Colors.mainDark,
    flexDirection: 'row',
  },
})

export default React.memo(AppTable)
