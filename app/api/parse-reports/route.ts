import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    console.log('🚀 開始解析報告...');
    
    const { stdout, stderr } = await execAsync('npm run parse-reports', {
      cwd: process.cwd()
    });
    
    console.log('✅ 解析完成');
    console.log(stdout);
    
    if (stderr && !stderr.includes('npm run parse-reports')) {
      console.error('錯誤:', stderr);
    }
    
    return NextResponse.json({
      success: true,
      message: '報告解析成功！',
      output: stdout
    });
  } catch (error: any) {
    console.error('❌ 解析失敗:', error);
    return NextResponse.json({
      success: false,
      message: '報告解析失敗',
      error: error.message
    }, { status: 500 });
  }
}

